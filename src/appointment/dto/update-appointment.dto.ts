import { IsDateString, IsOptional } from 'class-validator';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsDateString()
  date?: string;
}
