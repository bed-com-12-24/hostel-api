import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginAuthDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  // In-memory storage for demo (replace with database in production)
  private users: any[] = [];

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = this.users.find(u => u.email === registerDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const newUser = {
      id: this.users.length + 1,
      ...registerDto,
      createdAt: new Date(),
    };

    this.users.push(newUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = newUser;
    return {
      message: 'User registered successfully',
      user: userWithoutPassword,
    };
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user = this.users.find(u => u.email === loginAuthDto.email);

    if (!user || user.password !== loginAuthDto.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return {
      message: 'Login successful',
      user: userWithoutPassword,
      token: this.generateToken(user),
    };
  }

  async update(updateAuthDto: UpdateAuthDto) {
    // Implementation for updating user profile
    return {
      message: 'User updated successfully',
      data: updateAuthDto,
    };
  }

  private generateToken(user: any): string {
    // Simple token generation (implement proper JWT in production)
    return Buffer.from(
      JSON.stringify({ id: user.id, email: user.email }),
    ).toString('base64');
  }
}

