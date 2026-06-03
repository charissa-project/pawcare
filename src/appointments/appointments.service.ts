import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Role, AppointmentStatus } from '@prisma/client';

const appointmentSelect = {
  id: true,
  petId: true,
  doctorId: true,
  appointmentDate: true,
  type: true,
  notes: true,
  status: true,
  pet: {
    select: {
      id: true,
      name: true,
      species: true,
      breed: true,
      age: true,
      gender: true,
      weight: true,
      healthStatus: true,
      photoUrl: true,
      owner: {
        select: { id: true, fullname: true, email: true, role: true },
      },
    },
  },
  doctor: {
    select: {
      id: true,
      specialization: true,
      experience: true,
      schedule: true,
      isAvailable: true,
      user: {
        select: { id: true, fullname: true, email: true },
      },
    },
  },
};

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
        notes: dto.notes,
      },
      select: appointmentSelect,
    });
  }

  async findAll() {
    return this.prisma.appointment.findMany({
      select: appointmentSelect,
      orderBy: { appointmentDate: 'desc' },
    });
  }

  async findAllByUser(userId: number) {
    return this.prisma.appointment.findMany({
      where: { pet: { userId } },
      select: appointmentSelect,
      orderBy: { appointmentDate: 'desc' },
    });
  }

  async findAllByDoctor(userId: number) {
    const doctor = await this.prisma.doctor.findUnique({ where: { userId } });
    if (!doctor) throw new NotFoundException('Profil dokter tidak ditemukan');

    return this.prisma.appointment.findMany({
      where: { doctorId: doctor.id },
      select: appointmentSelect,
      orderBy: { appointmentDate: 'desc' },
    });
  }

  async findOne(id: number, userId: number, role: Role) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      select: {
        ...appointmentSelect,
        pet: {
          select: {
            ...appointmentSelect.pet.select,
            userId: true, // butuh untuk cek ownership
          },
        },
        doctor: {
          select: {
            ...appointmentSelect.doctor.select,
            userId: true, // butuh untuk cek ownership
          },
        },
      },
    });

    if (!appointment) throw new NotFoundException('Appointment tidak ditemukan');

    const isOwner = appointment.pet.userId === userId;
    const isDoctor = appointment.doctor.userId === userId;
    const isAdmin = role === Role.ADMIN;

    if (!isOwner && !isDoctor && !isAdmin) throw new ForbiddenException('Akses ditolak');

    return appointment;
  }

  async updateStatus(id: number, userId: number, role: Role, dto: UpdateAppointmentDto) {
    const appointment = await this.findOne(id, userId, role);

    const isDoctor = appointment.doctor.userId === userId;
    const isAdmin = role === Role.ADMIN;

    if (!isDoctor && !isAdmin) throw new ForbiddenException('Hanya dokter atau admin yang bisa update status');

    return this.prisma.appointment.update({
      where: { id },
      data: {
        appointmentDate: dto.appointmentDate ? new Date(dto.appointmentDate) : undefined,
        status: dto.status ? (dto.status as AppointmentStatus) : undefined,
      },
    });
  }

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