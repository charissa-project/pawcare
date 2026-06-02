import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMedicalRecordDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  diagnosis?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  treatment?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  notes?: string;
}