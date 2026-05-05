import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateHostelDto {
  @IsString()
  name!: string;

  @IsNumber()
  availableRooms!: number;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}
