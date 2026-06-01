import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UsersService {

  constructor(
    private prisma: PrismaService
  ) {}

  async findAll() {

    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        fullname: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      message: 'Data user berhasil diambil',
      data: users,
    };
  }

  async updatePhoto(userId: number, file: Express.Multer.File) {
  if (!file) throw new BadRequestException('File tidak ditemukan');

  const photoUrl = file.path;

  const user = await this.prisma.user.update({
    where: { id: userId },
    data: { photoUrl },
  });

  return {
    success: true,
    message: 'Foto profil berhasil diupdate',
    data: { photoUrl: user.photoUrl },
  };
}

async findMe(userId: number) {
  const user = await this.prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      fullname: true,
      email: true,
      role: true,
      photoUrl: true,
      createdAt: true,
    },
  });

  if (!user) throw new NotFoundException('User tidak ditemukan');

  return { success: true, data: user };
}

async updateRole(id: number, role: string) {
  const user = await this.prisma.user.findUnique({ where: { id } });
  if (!user) throw new NotFoundException('User tidak ditemukan');

  const updated = await this.prisma.user.update({
    where: { id },
    data: { role: role as any },
    select: { id: true, fullname: true, email: true, role: true },
  });

  return { success: true, message: 'Role berhasil diupdate', data: updated };
}

async remove(id: number) {
  const user = await this.prisma.user.findUnique({ where: { id } });
  if (!user) throw new NotFoundException('User tidak ditemukan');

  await this.prisma.user.delete({ where: { id } });

  return { success: true, message: 'User berhasil dihapus' };
}


}