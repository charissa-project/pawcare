import { IsString, IsOptional, IsDateString } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreatePetDto {
  @IsString()
  name: string;

  @IsString()
  species: string;

  @IsString()
  breed: string;

  @Transform(({ value }) => parseInt(value))  // ← ganti ini
  @IsInt()
  age: number;

  @IsString()
  gender: string;

  @Transform(({ value }) => parseFloat(value))  // ← ganti ini
  @IsNumber()
  weight: number;

  @IsString()
  healthStatus: string;

  @IsOptional()
  @IsDateString()
  lastVaccine?: string;

  @IsOptional()
  @IsDateString()
  nextVaccine?: string;
}