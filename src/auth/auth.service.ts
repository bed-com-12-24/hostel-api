// src/auth/auth.service.ts

import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginAuthDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // ── REGISTER ──────────────────────────────────────────────────────────────
  async register(dto: RegisterDto) {
    // 1. Validate required fields manually (or use class-validator later)
    if (!dto.email || !dto.password || !dto.name) {
      throw new BadRequestException('name, email and password are required');
    }

    // 2. Hash the password — NEVER store plain text passwords
    //    bcrypt salt rounds: 10 is the standard safe value
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3. Save user (UsersService handles duplicate check)
    const user = await this.usersService.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: dto.role ?? 'student',
      studentId: dto.studentId,
    });

    // 4. Return safe user (no password) + their token so they're logged in immediately
    const token = this.signToken(user.id, user.email, user.role);
    return { user: this.usersService.sanitize(user), token };
  }

  // ── LOGIN ──────────────────────────────────────────────────────────────────
  async login(dto: LoginAuthDto) {
    // 1. Find user by email
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      // Don't say "user not found" — that leaks info. Generic message.
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. Compare submitted password against the stored hash
    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Sign a JWT and return it
    const token = this.signToken(user.id, user.email, user.role);
    return { user: this.usersService.sanitize(user), token };
  }

  // ── GET PROFILE ───────────────────────────────────────────────────────────
  async getProfile(userId: number) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    return this.usersService.sanitize(user);
  }

  // ── SIGN TOKEN ────────────────────────────────────────────────────────────
  // Pure TS function — takes user data, returns a signed JWT string
  // The "payload" is what gets encoded inside the token
  private signToken(id: number, email: string, role: string): string {
    const payload = { sub: id, email, role };
    return this.jwtService.sign(payload);
    // Token expires in 1d (configured in AuthModule)
  }

  // ── VERIFY TOKEN ──────────────────────────────────────────────────────────
  // Pure TS function — decodes and validates a JWT string
  // Called by JwtGuard to check incoming requests
  verifyToken(token: string): { sub: number; email: string; role: string } {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}