import { Injectable } from '@nestjs/common';
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

  const photoUrl = `/uploads/${file.filename}`;

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

}