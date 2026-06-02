import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({
    example: 1,
    description: 'ID produk yang akan dimasukkan ke cart',
  })
  @IsInt()
  productId: number;

  @ApiProperty({
    example: 2,
    description: 'Jumlah produk',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  quantity: number;
}