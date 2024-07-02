// create the search-property.dto.ts file in the src/properties/dto directory and add the following code:

import { IsOptional, IsString } from 'class-validator';

export class SearchPropertyDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  location: string;
}
