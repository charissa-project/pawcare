import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Role } from '@prisma/client';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../common/upload.config';
import { ApiBearerAuth } from '@nestjs/swagger'; // ← tambah import

@ApiBearerAuth() // ← tambah ini

@UseGuards(JwtGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}
  
  // user buat appointment
  @Post()
@UseInterceptors(FileInterceptor('photo', multerConfig))
create(
  @GetUser('id') userId: number,
  @Body() dto: CreateAppointmentDto,
  @UploadedFile() file: Express.Multer.File,
) {
  return this.appointmentsService.create(userId, dto, file);
}

// admin lihat semua appointment
@Get()
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
findAll() {
  return this.appointmentsService.findAll();
}

  // user lihat appointment miliknya
  @Get('my')
  findMine(@GetUser('id') userId: number) {
    return this.appointmentsService.findAllByUser(userId);
  }

  // doctor lihat appointment yang ditangani
  @Get('doctor')
  @UseGuards(RolesGuard)
  @Roles(Role.DOCTOR)
  findByDoctor(@GetUser('id') userId: number) {
    return this.appointmentsService.findAllByDoctor(userId);
  }

  // detail appointment
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number,
    @GetUser('role') role: Role,
  ) {
    return this.appointmentsService.findOne(id, userId, role);
  }

  // doctor/admin update status
  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles(Role.DOCTOR, Role.ADMIN)
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number,
    @GetUser('role') role: Role,
    @Body() dto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.updateStatus(id, userId, role, dto);
  }

  // user cancel appointment
  @Patch(':id/cancel')
  cancel(@Param('id', ParseIntPipe) id: number, @GetUser('id') userId: number) {
    return this.appointmentsService.cancel(id, userId);
  }

  // tambahkan endpoint ini di dalam class AppointmentsController yang sudah ada

@Patch(':id/photo')
@UseInterceptors(FileInterceptor('photo', multerConfig))
uploadPhoto(
  @Param('id', ParseIntPipe) id: number,
  @GetUser('id') userId: number,
  @UploadedFile() file: Express.Multer.File,
) {
  return this.appointmentsService.updatePhoto(id, userId, file);
}

}