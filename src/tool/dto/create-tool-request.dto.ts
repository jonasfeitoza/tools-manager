import { ApiProperty } from '@nestjs/swagger';
import {
  Contains,
  IsArray,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

class CreateToolRequestDTO {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  link: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  description: string;

  @ApiProperty()
  //validate if is a array
  @IsArray({
    each: false,
    context: {
      each: true,
    },
  })
  tags: string[];
}

export default CreateToolRequestDTO;
