import { IsOptional } from '@nestjs/class-validator';
import { IsNumber, IsString } from 'class-validator';

export class UpdatePropertyDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  location: string;
}
