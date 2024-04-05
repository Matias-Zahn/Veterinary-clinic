import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  surname: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @IsNumber()
  @Min(4)
  dni: number;

  @IsString()
  @IsEnum(['male', 'female', 'other'])
  genre: string;

  @IsDateString()
  @IsString()
  birthdate: string;
}
