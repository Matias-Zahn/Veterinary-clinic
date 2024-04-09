import { IsDateString, IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePetDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  specie: string;

  @IsString()
  @MinLength(1)
  race: string;

  @IsDateString()
  @IsOptional()
  birthdate?: string;
}
