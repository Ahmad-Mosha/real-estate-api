import { Type } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsString()
  location: string;

  @IsNumber()
  @Type(() => Number)
  no_of_baths: number;

  @IsNumber()
  @Type(() => Number)
  no_of_beds: number;
}
