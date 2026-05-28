import { IsOptional, IsString, IsIn, IsDateString, IsBoolean } from 'class-validator';

export class UpdateReminderDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  @IsIn(['VACCINE', 'MEDICINE', 'CONSULTATION'])
  type?: string;

  @IsOptional()
  @IsDateString()
  reminderDate?: string;

  @IsOptional()
  @IsBoolean()
  isDone?: boolean;
}