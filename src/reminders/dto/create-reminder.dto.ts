import { IsInt, IsString, IsDateString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReminderDto {
  @ApiProperty()
  @IsInt()
  petId: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  @IsIn(['VACCINE', 'MEDICINE', 'CONSULTATION'])
  type: string;

  @ApiProperty()
  @IsDateString()
  reminderDate: string;
}