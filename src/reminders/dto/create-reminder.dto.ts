import { IsInt, IsString, IsDateString, IsIn } from 'class-validator';

export class CreateReminderDto {
  @IsInt()
  petId: number;

  @IsString()
  title: string;

  @IsString()
  @IsIn(['VACCINE', 'MEDICINE', 'CONSULTATION'])
  type: string;

  @IsDateString()
  reminderDate: string;
}