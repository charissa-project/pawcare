import { IsString, IsInt, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { Type } from 'class-transformer'; // ← tambah ini

export class CreatePetDto {
  @IsString()
  name: string;

  @IsString()
  species: string;

  @IsString()
  breed: string;

  @Type(() => Number) // ← tambah ini
  @IsInt()
  age: number;

  @IsString()
  gender: string;

  @Type(() => Number) // ← tambah ini
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