import { IsString, IsNumber, IsOptional, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date?: Date;

  @IsNumber()
  @IsNotEmpty()
  hostelNumber: number;

  @IsNotEmpty()
  @IsNumber()
  bookingFee: number;
}

