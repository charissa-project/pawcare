import { IsInt, IsString, IsDateString, IsOptional, IsNumber, IsIn } from 'class-validator';
import { Type } from 'class-transformer'; // 👈 add this
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @Type(() => Number) // 👈 add this
  @ApiProperty()
  @IsInt()
  petId: number;

  @Type(() => Number) // 👈 add this
  @ApiProperty()
  @IsInt()
  doctorId: number;

  @ApiProperty()
  @IsDateString()
  appointmentDate: string;

  @ApiProperty()
  @IsString()
  @IsIn(['VIDEO_CALL', 'CHAT'])
  type: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number) // 👈 add this too
  @IsNumber()
  consultationFee?: number;
}