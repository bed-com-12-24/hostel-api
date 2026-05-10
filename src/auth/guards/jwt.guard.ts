// src/auth/guards/jwt.guard.ts

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AuthService } from '../auth.service';

// Use this decorator on routes you want to skip auth for
export const IS_PUBLIC = 'isPublic';
export const Public = () =>
  (target: any, key: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(IS_PUBLIC, true, descriptor.value);
    return descriptor;
  };

// Use this decorator to restrict a route to admins only
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) =>
  (target: any, key: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(ROLES_KEY, roles, descriptor.value);
    return descriptor;
  };

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const handler = context.getHandler();

    // If route is marked @Public(), skip auth entirely
    const isPublic = Reflect.getMetadata(IS_PUBLIC, handler);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();

    // 1. Pull the token out of the Authorization header
    //    Expected format: "Bearer <token>"
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing token');
    }

    const token = authHeader.split(' ')[1];

    // 2. Verify the token using AuthService
    const payload = this.authService.verifyToken(token);

    // 3. Check role restrictions if @Roles() decorator is present
    const requiredRoles = Reflect.getMetadata(ROLES_KEY, handler) as
      | string[]
      | undefined;

    if (requiredRoles && !requiredRoles.includes(payload.role)) {
      throw new UnauthorizedException(
        `Access denied. Required role: ${requiredRoles.join(' or ')}`,
      );
    }

    // 4. Attach decoded user to the request so controllers can use it
    (request as any).user = payload;
    return true;
  }
}