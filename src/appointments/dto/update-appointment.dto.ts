import { IsOptional, IsString, IsDateString, IsIn } from 'class-validator';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsString()
  @IsIn(['PENDING', 'APPROVED', 'COMPLETED', 'CANCELLED'])
  status?: string;

  @IsOptional()
  @IsDateString()
  appointmentDate?: string;
}