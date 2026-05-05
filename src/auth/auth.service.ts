import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { LoginAuthDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.authRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const newUser = this.authRepository.create(registerDto);
    const savedUser = await this.authRepository.save(newUser);
    const { password, ...userWithoutPassword } = savedUser;

    return {
      message: 'User registered successfully',
      user: userWithoutPassword,
    };
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.authRepository.findOne({
      where: { email: loginAuthDto.email },
    });

    if (!user || user.password !== loginAuthDto.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { password, ...userWithoutPassword } = user;
    return {
      message: 'Login successful',
      user: userWithoutPassword,
      token: this.generateToken(user),
    };
  }

  async update(updateAuthDto: UpdateAuthDto) {
    if (!updateAuthDto.email) {
      throw new BadRequestException('Email is required to update auth data');
    }

    const authUser = await this.authRepository.findOne({
      where: { email: updateAuthDto.email },
    });

    if (!authUser) {
      throw new NotFoundException('User not found');
    }

    Object.assign(authUser, updateAuthDto);
    const updatedUser = await this.authRepository.save(authUser);
    const { password, ...userWithoutPassword } = updatedUser;

    return {
      message: 'User updated successfully',
      user: userWithoutPassword,
    };
  }

  private generateToken(user: Auth): string {
    return Buffer.from(JSON.stringify({ id: user.id, email: user.email })).toString('base64');
  }
}

