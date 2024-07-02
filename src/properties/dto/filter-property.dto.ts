import { IsOptional, IsNumber, Min } from 'class-validator';

export class FilterPropertyDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  baths?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  beds?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}
