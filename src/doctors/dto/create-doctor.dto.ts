import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  specialization: string;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  experience: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  schedule: string;
}