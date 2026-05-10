// src/auth/auth.controller.ts

import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginAuthDto } from './dto/login.dto';
import { JwtGuard, Public } from './guards/jwt.guard';
import type { Request } from 'express';

@Controller('auth')
@UseGuards(JwtGuard) // applied globally to this controller
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }


  @Public()
  @Post('login')
  login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto);
  }

  // PUBLIC — stateless JWT, logout is handled client-side (delete the token)
  @Public()
  @Post('logout')
  logout() {
    return { message: 'Logged out. Delete the token on your client.' };
  }

  // PROTECTED — must send Bearer token
  @Get('me')
  getProfile(@Req() req: Request) {
    const user = (req as any).user;
    return this.authService.getProfile(user.sub);
  }
}