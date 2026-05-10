import { IsString, IsNumber, IsOptional, IsNotEmpty, IsDate } from "class-validator";
import { Type } from "class-transformer";
export class CreateNotificationDto{

    @IsString()
    @IsNotEmpty()
    message!: string;

    @IsNotEmpty()
    @IsString()
    student_id!: string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    sentOn!: Date;


    

}

