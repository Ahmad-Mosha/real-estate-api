import { IsNumber, IsString } from 'class-validator';

export class UpdatePropertyDto {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsNumber()
  price?: number;

  @IsString()
  location?: string;
}
