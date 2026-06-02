import { IsEnum } from 'class-validator';
import { OrderStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderStatusDto {
@ApiProperty({ example: 'SHIPPED', enum: ['PENDING', 'SHIPPED', 'DELIVERED'] })
  @IsEnum(OrderStatus)
  status: OrderStatus;
}