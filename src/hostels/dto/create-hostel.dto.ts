import { Type } from 'class-transformer';
import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateHostelDto {
  @IsString()
  name!: string;

  @IsNumber()
  @Type(() => Number)
  availableRooms!: number;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}
