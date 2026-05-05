import { IsString, IsOptional, IsNotEmpty, IsNumber, IsDate, } from "class-validator";
import { Type } from 'class-transformer';
export class CreatePaymentDto{

    @IsString()
    @IsNotEmpty()
    payment_method!: string;

    @IsNotEmpty()
    @IsNumber()
    amount_payed!: number;

    @IsNotEmpty()
    @IsNumber()
    booking_id!: number;

    @IsNotEmpty()
    @IsString()
    student_id!: string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    date_payed!: Date;
      
    
     
      
    
      
      
    }

    


