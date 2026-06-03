import { IsOptional, IsString, IsDateString, IsIn, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAppointmentDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsIn(['PENDING', 'APPROVED', 'COMPLETED', 'CANCELLED'])
  status?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  appointmentDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsIn(['VIDEO_CALL', 'CHAT'])
  type?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  consultationFee?: number;
}