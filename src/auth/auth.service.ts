import { Injectable, UnauthorizedException, BadGatewayException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  //-------------REGISTER----------------
  async register(dto: RegisterDto) {

    //1. Validate required fields manually

    if (!dto.email || !dto.password || !dto.name) {  
      throw new BadRequestException('name, email and password are required');
    }

    //2. Hash the password 
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    
    //3. Create the user
    const user = await this.usersService.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: dto.role ?? 'student',
      studentId: dto.studentId,
    });

    //4. Return the user without password
    const token = this.signToken(user.id, user.email, user.role);
    return { user: this.usersService.sanitize(user), token };
  }

  
  //--------------------LOGIN ----------------------
}
