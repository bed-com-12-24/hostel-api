import { IsString, IsOptional, IsNotEmpty, IsNumber, IsDate, } from "class-validator";
export class CreateNotificationDto{

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
    date_payed!: Date;
      
    
     
      
    
      
      
    }

    


