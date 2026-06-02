import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadPaymentProofDto {
    @ApiProperty()
  @IsString()
  paymentProof: string;
}