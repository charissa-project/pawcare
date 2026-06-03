import { IsString, IsInt, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePetDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  species: string;

  @ApiProperty()
  @IsString()
  breed: string;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))  // ← ganti ini
  @IsInt()
  age: number;

  @ApiProperty()
  @IsString()
  gender: string;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value))  // ← ganti ini
  @IsNumber()
  weight: number;

  @ApiProperty()
  @IsString()
  healthStatus: string;
}