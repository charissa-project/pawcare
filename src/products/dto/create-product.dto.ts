import { IsString, IsNumber, IsInt, IsOptional, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { ProductCategory } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  price: number;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  stock: number;

  @ApiProperty()
  @IsEnum(ProductCategory)
  category: ProductCategory;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
}