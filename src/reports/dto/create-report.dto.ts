import { IsEnum, IsNumber, IsString, IsOptional, IsDateString, Min } from 'class-validator';
import { PaymentMethod, PaymentStatus } from '../entities/report.entity';

export class CreateReportDto {
  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;

  @IsNumber()
  @Min(0.01)
  amountPaid!: number;

  @IsNumber()
  bookingId!: number;

  @IsNumber()
  studentId!: number;

  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @IsOptional()
  @IsString()
  transactionId?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  paymentDate?: Date;
}
