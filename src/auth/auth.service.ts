import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) {
      throw new ConflictException({
        success: false,
        message: 'Email sudah digunakan',
      });
    }

    const hashedPassword = await bcrypt.hash(
      dto.password,
      10,
    );

    const newUser =
      await this.prisma.user.create({
        data: {
          fullname: dto.fullname,
          email: dto.email,
          password: hashedPassword,
          role: dto.role ?? Role.USER,
        },
      });

    return {
      success: true,
      message: 'Register berhasil',
      data: {
        id: newUser.id,
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role,
      },
    };
  }

  async login(dto: LoginDto) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

    if (!user) {
      throw new UnauthorizedException({
        success: false,
        message: 'User tidak ditemukan',
      });
    }

    const match =
      await bcrypt.compare(
        dto.password,
        user.password,
      );

    if (!match) {
      throw new UnauthorizedException({
        success: false,
        message: 'Password salah',
      });
    }

    const accessToken =
      this.jwtService.sign({
        id: user.id,
        email: user.email,
        role: user.role,
      });

    return {
      success: true,
      message: 'Login berhasil',
      data: {
        access_token: accessToken,
        user: {
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          role: user.role,
        },
      },
    };
  }
}