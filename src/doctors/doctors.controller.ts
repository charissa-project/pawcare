import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Delete,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../common/upload.config';

import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';

import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '@prisma/client';

@ApiBearerAuth()
@Controller('doctors')
export class DoctorsController {
  constructor(private doctorService: DoctorsService) {}

  // CREATE DOCTOR (ADMIN ONLY)
  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  create(
    @Body() dto: CreateDoctorDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.doctorService.create(dto, file);
  }

  // GET ALL DOCTORS (PUBLIC)
  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  // DOCTOR PROFILE
  @Get('me')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.DOCTOR)
  getMe(@GetUser('id') userId: number) {
    return this.doctorService.findMe(userId);
  }

  // GET SCHEDULE
  @Get('me/schedule')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.DOCTOR)
  getSchedule(@GetUser('id') userId: number) {
    return this.doctorService.getSchedule(userId);
  }

  // ADD SCHEDULE
  @Post('me/schedule')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.DOCTOR)
  addSchedule(
    @GetUser('id') userId: number,
    @Body() body: { day: string; startTime: string; endTime: string },
  ) {
    return this.doctorService.addSchedule(userId, body);
  }

  // DELETE SCHEDULE
  @Delete('me/schedule/:scheduleId')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.DOCTOR)
  removeSchedule(
    @GetUser('id') userId: number,
    @Param('scheduleId', ParseIntPipe) scheduleId: number,
  ) {
    return this.doctorService.removeSchedule(userId, scheduleId);
  }

  // UPDATE DOCTOR (ADMIN)
  @Patch(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: any,
  ) {
    return this.doctorService.update(id, dto);
  }

  // DELETE DOCTOR (ADMIN)
  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.doctorService.remove(id);
  }
}