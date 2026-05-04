import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return "This action adds a new auth";
  }
  @Post('/login')
  create(@Body() createAuthDto: CreateAuthDto) {
    return "This action logs in a user";
  }
  @Post('/logout')
  create(@Body() createAuthDto: CreateAuthDto) {
    return "This action logs out a user";
  }
  @Post('/me')
  create(@Body() createAuthDto: CreateAuthDto) {
    return "This action shows the current user";
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
