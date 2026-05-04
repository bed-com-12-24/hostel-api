// src/auth/auth.service.ts

import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // ── REGISTER ───────────────────────────────────────────────────────────────
  async register(dto: RegisterDto) {
    if (!dto.name || !dto.email || !dto.password) {
      throw new BadRequestException('name, email and password are required');
    }

    // Save password exactly as received — no hashing
    const user = await this.usersService.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
      role: dto.role ?? 'student',
      studentId: dto.studentId,
    });

    const token = this.signToken(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        studentId: user.studentId,
        createdAt: user.createdAt,
      },
      token,
    };
  }

  // ── LOGIN ──────────────────────────────────────────────────────────────────
  async login(dto: LoginDto) {
    if (!dto.email || !dto.password) {
      throw new BadRequestException('email and password are required');
    }

    // 1. Find user by email
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. Plain string comparison — no bcrypt
    if (user.password !== dto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Sign and return token
    const token = this.signToken(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        studentId: user.studentId,
        createdAt: user.createdAt,
      },
      token,
    };
  }

  // ── GET PROFILE ────────────────────────────────────────────────────────────
  async getProfile(userId: number) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      studentId: user.studentId,
      createdAt: user.createdAt,
    };
  }

  // ── SIGN TOKEN — pure TS function ──────────────────────────────────────────
  private signToken(id: number, email: string, role: string): string {
    return this.jwtService.sign({ sub: id, email, role });
  }

  // ── VERIFY TOKEN — pure TS function ───────────────────────────────────────
  verifyToken(token: string): { sub: number; email: string; role: string } {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}