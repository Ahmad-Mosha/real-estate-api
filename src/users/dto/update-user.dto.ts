import { IsOptional } from '@nestjs/class-validator';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @IsOptional()
  @Matches(/^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/, {
    message:
      'Password must be at least 8 characters long 1 lowercase letter, and 1 number',
  })
  password: string;
}
