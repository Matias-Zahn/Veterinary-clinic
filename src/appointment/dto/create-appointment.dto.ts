import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsDateString()
  date: string;

  @IsNumber()
  @IsOptional()
  durationMinutes?: number;

  @IsString()
  @MinLength(1)
  reason: string;

  @IsUUID()
  @IsString()
  petId: string;

  @IsUUID()
  @IsString()
  medicId: string;
}
