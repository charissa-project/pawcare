import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Role } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger'; // ← tambah import

@ApiBearerAuth() // ← tambah ini

@UseGuards(JwtGuard)
@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  // hanya doctor yang bisa buat
  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.DOCTOR)
  create(@GetUser('id') userId: number, @Body() dto: CreateMedicalRecordDto) {
    return this.medicalRecordsService.create(userId, dto);
  }

@Get('all')
@UseGuards(RolesGuard)
@Roles('ADMIN', 'DOCTOR')
findAllAdmin() {
  return this.medicalRecordsService.findAll();
}

  // user lihat semua rekam medis pet miliknya
  @Get()
  findAll(@GetUser('id') userId: number) {
    return this.medicalRecordsService.findAllByUser(userId);
  }

  // rekam medis by pet
  @Get('pet/:petId')
  findByPet(
    @Param('petId', ParseIntPipe) petId: number,
    @GetUser('id') userId: number,
    @GetUser('role') role: Role,
  ) {
    return this.medicalRecordsService.findByPet(petId, userId, role);
  }

  // detail rekam medis
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number,
    @GetUser('role') role: Role,
  ) {
    return this.medicalRecordsService.findOne(id, userId, role);
  }

  // doctor/admin update
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.DOCTOR, Role.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number,
    @GetUser('role') role: Role,
    @Body() dto: UpdateMedicalRecordDto,
  ) {
    return this.medicalRecordsService.update(id, userId, role, dto);
  }

  // hanya admin yang bisa hapus
  @Delete(':id')
  @UseGuards(RolesGuard)
 @Roles('ADMIN', 'DOCTOR')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number,
    @GetUser('role') role: Role,
  ) {
    return this.medicalRecordsService.remove(id, userId, role);
  }
}