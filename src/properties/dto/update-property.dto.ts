import { IsOptional } from '@nestjs/class-validator';
import { Type } from 'class-transformer';
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
  @Type(() => Number)
  price: number;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  no_of_beds: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  no_of_baths: number;
}
