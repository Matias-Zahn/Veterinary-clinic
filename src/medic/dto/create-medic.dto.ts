import { IsArray, IsNumber, IsString, Max, MinLength } from 'class-validator';

export class CreateMedicDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsNumber()
  @Max(99999999)
  //Considerar si el dni lleva letra
  dni: number;

  @IsString()
  @MinLength(1)
  surname: string;

  @IsArray()
  @IsString({ each: true })
  speciality: string[];
}
