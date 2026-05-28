import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsInt()
  petId: number;

  @IsString()
  diagnosis: string;

  @IsString()
  treatment: string;

  @IsOptional()
  @IsString()
  notes?: string;
}