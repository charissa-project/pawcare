import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Role } from '@prisma/client';
import { AppointmentStatus } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

async create(userId: number, dto: CreateAppointmentDto) {
  const pet = await this.prisma.pet.findUnique({ where: { id: dto.petId } });
  if (!pet) throw new NotFoundException('Hewan tidak ditemukan');
  if (pet.userId !== userId) throw new ForbiddenException('Akses ditolak');

  const doctor = await this.prisma.doctor.findUnique({ where: { id: dto.doctorId } });
  if (!doctor) throw new NotFoundException('Dokter tidak ditemukan');

  return this.prisma.appointment.create({
    data: {
      petId: dto.petId,
      doctorId: dto.doctorId,
      appointmentDate: new Date(dto.appointmentDate),
      type: dto.type as any,
      consultationFee: dto.consultationFee,
    },
    include: {
      pet: true,
      doctor: { include: { user: true } },
    },
  });
}

// tambah di sini
async findAll() {
  return this.prisma.appointment.findMany({
    include: {
      pet: { include: { owner: true } },
      doctor: { include: { user: true } },
    },
    orderBy: { appointmentDate: 'desc' },
  });
}

  // user: lihat appointment milik sendiri
  async findAllByUser(userId: number) {
    return this.prisma.appointment.findMany({
      where: {
        pet: { userId },
      },
      include: {
        pet: true,
        doctor: { include: { user: true } },
      },
      orderBy: { appointmentDate: 'desc' },
    });
  }

  // doctor: lihat appointment yang ditangani
  async findAllByDoctor(userId: number) {
    const doctor = await this.prisma.doctor.findUnique({ where: { userId } });
    if (!doctor) throw new NotFoundException('Profil dokter tidak ditemukan');

    return this.prisma.appointment.findMany({
      where: { doctorId: doctor.id },
      include: {
        pet: { include: { owner: true } },
        doctor: { include: { user: true } },
      },
      orderBy: { appointmentDate: 'desc' },
    });
  }

  async findOne(id: number, userId: number, role: Role) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        pet: { include: { owner: true } },
        doctor: { include: { user: true } },
      },
    });

    if (!appointment) throw new NotFoundException('Appointment tidak ditemukan');

    const isOwner = appointment.pet.userId === userId;
    const isDoctor = appointment.doctor.userId === userId;
    const isAdmin = role === Role.ADMIN;

    if (!isOwner && !isDoctor && !isAdmin) throw new ForbiddenException('Akses ditolak');

    return appointment;
  }

  // doctor/admin update status
  async updateStatus(id: number, userId: number, role: Role, dto: UpdateAppointmentDto) {
    const appointment = await this.findOne(id, userId, role);

    const isDoctor = appointment.doctor.userId === userId;
    const isAdmin = role === Role.ADMIN;

    if (!isDoctor && !isAdmin) throw new ForbiddenException('Hanya dokter atau admin yang bisa update status');

    return this.prisma.appointment.update({
      where: { id },
      data: {
  appointmentDate: dto.appointmentDate
    ? new Date(dto.appointmentDate)
    : undefined,

  status: dto.status
    ? (dto.status as AppointmentStatus)
    : undefined,
},
    });
  }

  // user cancel appointment sendiri
  async cancel(id: number, userId: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: { pet: true },
    });

    if (!appointment) throw new NotFoundException('Appointment tidak ditemukan');
    if (appointment.pet.userId !== userId) throw new ForbiddenException('Akses ditolak');
    if (appointment.status === 'COMPLETED') throw new ForbiddenException('Appointment sudah selesai');

    return this.prisma.appointment.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
  }

  async update(id: number, userId: number, role: Role, dto: UpdateAppointmentDto) {
  await this.findOne(id, userId, role);

  return this.prisma.appointment.update({
    where: { id },
    data: {
      ...dto,
      status: dto.status ? (dto.status as any) : undefined,
      appointmentDate: dto.appointmentDate ? new Date(dto.appointmentDate) : undefined,
    },
  });
}

}