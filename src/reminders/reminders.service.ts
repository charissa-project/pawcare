import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';

@Injectable()
export class RemindersService {
  constructor(private prisma: PrismaService) {}

  private async validatePetOwnership(petId: number, userId: number) {
    const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
    if (!pet) throw new NotFoundException('Hewan tidak ditemukan');
    if (pet.userId !== userId) throw new ForbiddenException('Akses ditolak');
    return pet;
  }

  async create(userId: number, dto: CreateReminderDto) {
    await this.validatePetOwnership(dto.petId, userId);

    return this.prisma.reminder.create({
      data: {
        ...dto,
        reminderDate: new Date(dto.reminderDate),
      },
    });
  }

  // semua reminder milik user (semua pet)
  async findAllByUser(userId: number) {
    return this.prisma.reminder.findMany({
      where: {
        pet: { userId },
      },
      include: { pet: true },
      orderBy: { reminderDate: 'asc' },
    });
  }

  // reminder by pet tertentu
  async findByPet(petId: number, userId: number) {
    await this.validatePetOwnership(petId, userId);

    return this.prisma.reminder.findMany({
      where: { petId },
      orderBy: { reminderDate: 'asc' },
    });
  }

  async update(id: number, userId: number, dto: UpdateReminderDto) {
    const reminder = await this.prisma.reminder.findUnique({
      where: { id },
      include: { pet: true },
    });

    if (!reminder) throw new NotFoundException('Reminder tidak ditemukan');
    if (reminder.pet.userId !== userId) throw new ForbiddenException('Akses ditolak');

    return this.prisma.reminder.update({
      where: { id },
      data: {
        ...dto,
        reminderDate: dto.reminderDate ? new Date(dto.reminderDate) : undefined,
      },
    });
  }

  // shortcut mark as done
  async markDone(id: number, userId: number) {
    return this.update(id, userId, { isDone: true });
  }

  async remove(id: number, userId: number) {
    const reminder = await this.prisma.reminder.findUnique({
      where: { id },
      include: { pet: true },
    });

    if (!reminder) throw new NotFoundException('Reminder tidak ditemukan');
    if (reminder.pet.userId !== userId) throw new ForbiddenException('Akses ditolak');

    return this.prisma.reminder.delete({ where: { id } });
  }
}