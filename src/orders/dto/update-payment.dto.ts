import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { PaymentStatus } from '@prisma/client';

export class UpdatePaymentStatusDto {
  @ApiProperty({ enum: PaymentStatus, example: 'PAID',})
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;
}