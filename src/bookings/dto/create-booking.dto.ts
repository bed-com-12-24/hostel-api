import { IsString, IsNumber, IsOptional, IsNotEmpty, IsDate } from 'class-validator'; 
export class CreateBookingDto { 
@IsString() 
@IsNotEmpty() 
name: string;

@IsString() 
@IsNotEmpty() 
email: string;

@IsDate() 
date: Date;

@IsNumber() 
@IsNotEmpty() 
hostelNumber: number;

@IsNotEmpty()
@IsNumber()
bookingFee:number
}

