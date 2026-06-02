import { IsInt, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicalRecordDto {
  @ApiProperty()
  @IsInt()
  petId: number;

  @ApiProperty()
  @IsString()
  diagnosis: string;

  @ApiProperty()
  @IsString()
  treatment: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}