import { IsString, IsNumber } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  location: string;

  @IsNumber()
  no_of_baths: number;

  @IsNumber()
  no_of_beds: number;
}
