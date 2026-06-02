import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: { id: true, fullname: true, email: true, role: true, createdAt: true },
    });
    return { success: true, message: 'Data user berhasil diambil', data: users };
  }

  async findMe(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, fullname: true, email: true, role: true, photoUrl: true, createdAt: true },
    });
    if (!user) throw new NotFoundException('User tidak ditemukan');
    return { success: true, data: user };
  }

  async create(dto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email sudah digunakan');

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        fullname: dto.fullname,
        email: dto.email,
        password: hashed,
        role: dto.role ?? 'USER',
      },
      select: { id: true, fullname: true, email: true, role: true, createdAt: true },
    });

    return { success: true, message: 'User berhasil ditambahkan', data: user };
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User tidak ditemukan');

    if (dto.email && dto.email !== user.email) {
      const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
      if (existing) throw new ConflictException('Email sudah digunakan');
    }

    const data: any = { ...dto };
    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data,
      select: { id: true, fullname: true, email: true, role: true, createdAt: true },
    });

    return { success: true, message: 'User berhasil diupdate', data: updated };
  }

  async updatePhoto(userId: number, file: Express.Multer.File) {
    if (!file) throw new BadRequestException('File tidak ditemukan');
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { photoUrl: file.path },
    });
    return { success: true, message: 'Foto profil berhasil diupdate', data: { photoUrl: user.photoUrl } };
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