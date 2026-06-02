import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddScheduleDto {
  @ApiProperty({ example: 'Senin' })
  @IsString()
  day: string;

  @ApiProperty({ example: '08:00' })
  @IsString()
  startTime: string;

  @ApiProperty({ example: '12:00' })
  @IsString()
  endTime: string;
}