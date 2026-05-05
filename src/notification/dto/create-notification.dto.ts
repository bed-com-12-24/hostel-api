import { IsString, IsNumber, IsOptional, IsNotEmpty, IsDate } from "class-validator";
export class CreateNotificationDto{

    @IsString()
    @IsNotEmpty()
    message!: string;

    @IsNotEmpty()
    @IsString()
    student_id!: string;

    @IsNotEmpty()
    @IsDate()
    sentOn!: Date;


    

}

