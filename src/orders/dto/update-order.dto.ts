import { IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderStatusDto {
  @ApiProperty({ example: 'SHIPPED', enum: ['PENDING', 'SHIPPED', 'DELIVERED'] })
  @IsString()
  @IsIn(['PENDING', 'SHIPPED', 'DELIVERED'])
  status: string;
}