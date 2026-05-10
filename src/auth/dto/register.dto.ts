import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from 'class-validator'; 
export class RegisterDto {
    @IsEmail() 
    email!: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    password!: string; 
    
    @IsString()  
    @MinLength(2) 
    @MaxLength(200) 
    name!: string;  
      
    
    @IsOptional() 
    @IsString()  
    @MaxLength(20)
    phoneNumber?: string;
    @IsOptional()
    @IsString()
    role?: string;

    @IsOptional()
    @IsString()
    studentId?: string;} 

export class CreateAuthDto extends RegisterDto {}
