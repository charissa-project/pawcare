import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { Role } from '@prisma/client';

@Injectable()
export class MedicalRecordsService {
  constructor(private prisma: PrismaService) {}

  // hanya doctor yang bisa buat rekam medis
  async create(userId: number, dto: CreateMedicalRecordDto) {
    const doctor = await this.prisma.doctor.findUnique({ where: { userId } });
    if (!doctor) throw new NotFoundException('Profil dokter tidak ditemukan');

    const pet = await this.prisma.pet.findUnique({ where: { id: dto.petId } });
    if (!pet) throw new NotFoundException('Hewan tidak ditemukan');

    return this.prisma.medicalRecord.create({
      data: {
        ...dto,
        doctorId: doctor.id,
      },
      include: {
        pet: true,
        doctor: { include: { user: true } },
      },
    });
  }

async findAll() {
  return this.prisma.medicalRecord.findMany({
    include: {
      pet: { include: { owner: true } },
      doctor: { include: { user: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

  // user: lihat rekam medis semua pet miliknya
  async findAllByUser(userId: number) {
    return this.prisma.medicalRecord.findMany({
      where: {
        pet: { userId },
      },
      include: {
        pet: true,
        doctor: { include: { user: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // rekam medis by pet tertentu
  async findByPet(petId: number, userId: number, role: Role) {
    const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
    if (!pet) throw new NotFoundException('Hewan tidak ditemukan');

    // user hanya bisa lihat pet miliknya, doctor & admin bisa lihat semua
    if (role === Role.USER && pet.userId !== userId) {
      throw new ForbiddenException('Akses ditolak');
    }

    return this.prisma.medicalRecord.findMany({
      where: { petId },
      include: {
        doctor: { include: { user: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, userId: number, role: Role) {
    const record = await this.prisma.medicalRecord.findUnique({
      where: { id },
      include: {
        pet: { include: { owner: true } },
        doctor: { include: { user: true } },
      },
    });

    if (!record) throw new NotFoundException('Rekam medis tidak ditemukan');

    const isOwner = record.pet.userId === userId;
    const isDoctor = record.doctor.userId === userId;
    const isAdmin = role === Role.ADMIN;

    if (!isOwner && !isDoctor && !isAdmin) {
      throw new ForbiddenException('Akses ditolak');
    }

    return record;
  }

  // hanya doctor yang membuat atau admin yang bisa update
  async update(id: number, userId: number, role: Role, dto: UpdateMedicalRecordDto) {
    const record = await this.findOne(id, userId, role);

    const isDoctor = record.doctor.userId === userId;
    const isAdmin = role === Role.ADMIN;

    if (!isDoctor && !isAdmin) {
      throw new ForbiddenException('Hanya dokter atau admin yang bisa mengubah rekam medis');
    }

    return this.prisma.medicalRecord.update({
      where: { id },
      data: dto,
      include: {
        pet: true,
        doctor: { include: { user: true } },
      },
    });
  }

  async remove(id: number, userId: number, role: Role) {
    await this.findOne(id, userId, role);

    if (role !== Role.ADMIN) {
      throw new ForbiddenException('Hanya admin yang bisa menghapus rekam medis');
    }

    return this.prisma.medicalRecord.delete({ where: { id } });
  }
}