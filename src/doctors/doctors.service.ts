import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { AddScheduleDto } from './dto/add-schedule.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}

  // CREATE DOCTOR
  async create(dto: CreateDoctorDto, file?: Express.Multer.File) {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(dto.userId) },
    });

    if (!user) throw new NotFoundException('User tidak ditemukan');

    const doctor = await this.prisma.doctor.create({
      data: { ...dto },
    });

    return { success: true, message: 'Dokter berhasil ditambahkan', data: doctor };
  }

  // GET ALL DOCTORS
  async findAll() {
    const doctors = await this.prisma.doctor.findMany({
      select: {
        id: true,
        userId: true,
        specialization: true,
        experience: true,
        schedule: true,
        user: { select: { fullname: true, email: true } },
      },
    });

    return { success: true, message: 'Data dokter berhasil diambil', data: doctors };
  }

  // GET DOCTOR PROFILE
  async findMe(userId: number) {
    const doctor = await this.prisma.doctor.findFirst({
      where: { userId: Number(userId) },
      include: {
        user: { select: { id: true, fullname: true, email: true, photoUrl: true } },
      },
    });

    if (!doctor) throw new NotFoundException('Profil dokter tidak ditemukan');

    return { success: true, data: doctor };
  }

  // GET SCHEDULE
  async getSchedule(userId: number) {
    const doctor = await this.prisma.doctor.findFirst({
      where: { userId: Number(userId) },
    });

    if (!doctor) throw new NotFoundException('Profil dokter tidak ditemukan');

    const schedules = await this.prisma.schedule.findMany({
      where: { doctorId: doctor.id },
    });

    return { success: true, data: schedules };
  }

  // ADD SCHEDULE
  async addSchedule(userId: number, body: AddScheduleDto) {
    const doctor = await this.prisma.doctor.findFirst({
      where: { userId: Number(userId) },
    });

    if (!doctor) throw new NotFoundException('Profil dokter tidak ditemukan');

    const schedule = await this.prisma.schedule.create({
      data: {
        doctorId: doctor.id,
        day: body.day,
        startTime: body.startTime,
        endTime: body.endTime,
      },
    });

    return { success: true, message: 'Jadwal berhasil ditambahkan', data: schedule };
  }

  // UPDATE SCHEDULE ← baru
  async updateSchedule(userId: number, scheduleId: number, body: AddScheduleDto) {
    const doctor = await this.prisma.doctor.findFirst({
      where: { userId: Number(userId) },
    });

    if (!doctor) throw new NotFoundException('Profil dokter tidak ditemukan');

    const schedule = await this.prisma.schedule.findFirst({
      where: { id: Number(scheduleId), doctorId: doctor.id },
    });

    if (!schedule) throw new NotFoundException('Jadwal tidak ditemukan');

    const updated = await this.prisma.schedule.update({
      where: { id: Number(scheduleId) },
      data: {
        day: body.day,
        startTime: body.startTime,
        endTime: body.endTime,
      },
    });

    return { success: true, message: 'Jadwal berhasil diupdate', data: updated };
  }

  // REMOVE SCHEDULE
  async removeSchedule(userId: number, scheduleId: number) {
    const doctor = await this.prisma.doctor.findFirst({
      where: { userId: Number(userId) },
    });

    if (!doctor) throw new NotFoundException('Profil dokter tidak ditemukan');

    const schedule = await this.prisma.schedule.findFirst({
      where: { id: Number(scheduleId), doctorId: doctor.id },
    });

    if (!schedule) throw new NotFoundException('Jadwal tidak ditemukan');

    await this.prisma.schedule.delete({ where: { id: Number(scheduleId) } });

    return { success: true, message: 'Jadwal berhasil dihapus' };
  }

  // UPDATE DOCTOR (ADMIN)
 async update(id: number, dto: UpdateDoctorDto) {
  const doctor = await this.prisma.doctor.findUnique({ where: { id: Number(id) } });
  if (!doctor) throw new NotFoundException('Dokter tidak ditemukan');

  const updated = await this.prisma.doctor.update({
    where: { id: Number(id) },
    data: dto,
  });

  return { success: true, message: 'Dokter berhasil diperbarui', data: updated };
}

  // DELETE DOCTOR (ADMIN)
  async remove(id: number) {
    const doctor = await this.prisma.doctor.findUnique({ where: { id: Number(id) } });

    if (!doctor) throw new NotFoundException('Dokter tidak ditemukan');

    await this.prisma.doctor.delete({ where: { id: Number(id) } });

    return { success: true, message: 'Dokter berhasil dihapus' };
  }
}