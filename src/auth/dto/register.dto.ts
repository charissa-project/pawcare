import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsEnum,
} from 'class-validator';

import { Role } from '@prisma/client';

export class RegisterDto {
  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  email: string;

  @MinLength(6, {
    message: 'Password minimal 6 karakter',
  })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}