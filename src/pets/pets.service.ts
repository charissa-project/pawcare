import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreatePetDto) {
    return this.prisma.pet.create({
      data: {
        ...dto,
        lastVaccine: dto.lastVaccine ? new Date(dto.lastVaccine) : null,
        nextVaccine: dto.nextVaccine ? new Date(dto.nextVaccine) : null,
        userId,
      },
    });
  }

  async findAllByUser(userId: number) {
    return this.prisma.pet.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, userId: number) {
    const pet = await this.prisma.pet.findUnique({
      where: { id },
      include: {
        reminders: true,
        medicalRecords: {
          include: { doctor: { include: { user: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!pet) throw new NotFoundException('Hewan tidak ditemukan');
    if (pet.userId !== userId) throw new ForbiddenException('Akses ditolak');

    return pet;
  }

  async update(id: number, userId: number, dto: UpdatePetDto) {
    await this.findOne(id, userId); // validasi kepemilikan

    return this.prisma.pet.update({
      where: { id },
      data: {
        ...dto,
        lastVaccine: dto.lastVaccine ? new Date(dto.lastVaccine) : undefined,
        nextVaccine: dto.nextVaccine ? new Date(dto.nextVaccine) : undefined,
      },
    });
  }

  async remove(id: number, userId: number) {
  const pet = await this.findOne(id, userId);

  await this.prisma.pet.delete({
    where: { id },
  });

  return {
    success: true,
    message: 'Data pet berhasil dihapus',
    data: pet,
  };
}
}
