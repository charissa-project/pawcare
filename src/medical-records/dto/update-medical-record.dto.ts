import { IsOptional, IsString } from 'class-validator';

export class UpdateMedicalRecordDto {
  @IsOptional()
  @IsString()
  diagnosis?: string;

  @IsOptional()
  @IsString()
  treatment?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}