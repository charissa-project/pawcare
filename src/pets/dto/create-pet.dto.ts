import { IsString, IsInt, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreatePetDto {
  @IsString()
  name: string;

  @IsString()
  species: string;

  @IsString()
  breed: string;

  @IsInt()
  age: number;

  @IsString()
  gender: string;

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