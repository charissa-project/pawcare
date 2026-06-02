import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, IsBoolean, IsNumber } from 'class-validator';

export class UpdateDoctorDto {
  @ApiPropertyOptional({ example: 'Dermatologi' })
  @IsOptional()
  @IsString()
  specialization?: string;

  @ApiPropertyOptional({ example: 5 })
  @IsOptional()
  @IsInt()
  experience?: number;

  @ApiPropertyOptional({ example: 'Senin-Jumat' })
  @IsOptional()
  @IsString()
  schedule?: string;

  @ApiPropertyOptional({ example: 4.5 })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}