import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class UpdateCartDto {
  @ApiProperty({
    example: 3,
    description: 'Jumlah baru item di cart',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  quantity: number;
}