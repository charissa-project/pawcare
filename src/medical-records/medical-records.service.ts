import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { Role } from '@prisma/client';

@Injectable()
export class MedicalRecordsService {
  constructor(private prisma: PrismaService) {}

  // CREATE (DOCTOR ONLY - dari controller guard)
  async create(userId: number, dto: CreateMedicalRecordDto) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { userId },
    });

    if (!doctor) {
      throw new NotFoundException('Profil dokter tidak ditemukan');
    }

    const pet = await this.prisma.pet.findUnique({
      where: { id: dto.petId },
    });

    if (!pet) {
      throw new NotFoundException('Hewan tidak ditemukan');
    }

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

  // ADMIN: semua data
  async findAll() {
    return this.prisma.medicalRecord.findMany({
      include: {
        pet: { include: { owner: true } },
        doctor: { include: { user: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // USER: hanya pet miliknya
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

  // BY PET
  async findByPet(petId: number, userId: number, role: Role) {
    const pet = await this.prisma.pet.findUnique({
      where: { id: petId },
    });

    if (!pet) {
      throw new NotFoundException('Hewan tidak ditemukan');
    }

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

  // DETAIL RECORD (FIXED AUTH 🔥)
  async findOne(id: number, userId: number, role: Role) {
    const record = await this.prisma.medicalRecord.findUnique({
      where: { id },
      include: {
        pet: { include: { owner: true } },
        doctor: { include: { user: true } },
      },
    });

    if (!record) {
      throw new NotFoundException('Rekam medis tidak ditemukan');
    }

    const isOwner = record.pet.userId === userId;
    const isDoctor = role === Role.DOCTOR;
    const isAdmin = role === Role.ADMIN;

    if (!isOwner && !isDoctor && !isAdmin) {
      throw new ForbiddenException('Akses ditolak');
    }

    return record;
  }

  // UPDATE (DOCTOR + ADMIN)
  async update(
    id: number,
    userId: number,
    role: Role,
    dto: UpdateMedicalRecordDto,
  ) {
    const record = await this.findOne(id, userId, role);

    const isDoctor = role === Role.DOCTOR;
    const isAdmin = role === Role.ADMIN;

    if (!isDoctor && !isAdmin) {
      throw new ForbiddenException(
        'Hanya dokter atau admin yang bisa mengubah rekam medis',
      );
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

  // DELETE (DOCTOR + ADMIN)
  async remove(id: number, userId: number, role: Role) {
    await this.findOne(id, userId, role);

    const isDoctor = role === Role.DOCTOR;
    const isAdmin = role === Role.ADMIN;

    if (!isDoctor && !isAdmin) {
      throw new ForbiddenException(
        'Hanya dokter atau admin yang bisa menghapus rekam medis',
      );
    }

    return this.prisma.medicalRecord.delete({
      where: { id },
    });
  }
}