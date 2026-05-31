import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { ProductCategory } from '@prisma/client';

export class CreateProductDto {
  @IsString()
  name: string;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  price: number;

  @IsEnum(ProductCategory)
  category: ProductCategory;

  @IsOptional()
  @IsString()
  description?: string;
}