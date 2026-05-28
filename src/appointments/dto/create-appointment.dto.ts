import { IsInt, IsString, IsDateString, IsOptional, IsNumber, IsIn } from 'class-validator';
import { Type } from 'class-transformer'; // 👈 add this

export class CreateAppointmentDto {
  @Type(() => Number) // 👈 add this
  @IsInt()
  petId: number;

  @Type(() => Number) // 👈 add this
  @IsInt()
  doctorId: number;

  @IsDateString()
  appointmentDate: string;

  @IsString()
  @IsIn(['VIDEO_CALL', 'CHAT'])
  type: string;

  @IsOptional()
  @Type(() => Number) // 👈 add this too
  @IsNumber()
  consultationFee?: number;
}