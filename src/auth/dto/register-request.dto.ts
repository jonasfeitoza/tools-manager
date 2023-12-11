import { ApiProperty } from '@nestjs/swagger';
import {
  Contains,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

class RegisterRequestDTO {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  password: string;
}

export default RegisterRequestDTO;
