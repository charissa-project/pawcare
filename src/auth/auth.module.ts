import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PrismaModule,

    PassportModule,

    JwtModule.register({
  secret: process.env.JWT_SECRET || 'rahasia123',
  signOptions: {
    expiresIn: '1d',
  },
}),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    PrismaService,
    JwtStrategy,
  ],
})
export class AuthModule {}