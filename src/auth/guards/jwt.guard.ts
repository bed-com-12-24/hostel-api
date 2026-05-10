
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AuthService } from '../auth.service';


export const IS_PUBLIC = 'isPublic';
export const Public = () =>
  (target: any, key: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(IS_PUBLIC, true, descriptor.value);
    return descriptor;
  };


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

   
    const isPublic = Reflect.getMetadata(IS_PUBLIC, handler);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();

  
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing token');
    }

    const token = authHeader.split(' ')[1];

    
    const payload = this.authService.verifyToken(token);

 
    const requiredRoles = Reflect.getMetadata(ROLES_KEY, handler) as
      | string[]
      | undefined;

    if (requiredRoles && !requiredRoles.includes(payload.role)) {
      throw new UnauthorizedException(
        `Access denied. Required role: ${requiredRoles.join(' or ')}`,
      );
    }

   
    (request as any).user = payload;
    return true;
  }
}