import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Role } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

 async create(userId: number, dto: CreatePostDto, file?: Express.Multer.File) {
  const imageUrl = file ? `/uploads/${file.filename}` : null;

  const post = await this.prisma.post.create({
    data: {
      userId,
      content: dto.content,
      imageUrl,
    },
  });

  return {
    success: true,
    message: 'Post berhasil dibuat',
    data: post,
  };
}

  // semua post (feed komunitas)
  async findAll() {
    return this.prisma.post.findMany({
      include: {
        user: { select: { id: true, fullname: true } },
        comments: {
          include: { user: { select: { id: true, fullname: true } } },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, fullname: true } },
        comments: {
          include: { user: { select: { id: true, fullname: true } } },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!post) throw new NotFoundException('Post tidak ditemukan');
    return post;
  }

  async update(id: number, userId: number, role: Role, dto: UpdatePostDto) {
    const post = await this.findOne(id);

    const isOwner = post.userId === userId;
    const isAdmin = role === Role.ADMIN;

    if (!isOwner && !isAdmin) throw new ForbiddenException('Akses ditolak');

    return this.prisma.post.update({
      where: { id },
      data: { content: dto.content },
      include: {
        user: { select: { id: true, fullname: true } },
      },
    });
  }

  async remove(id: number, userId: number, role: Role) {
    const post = await this.findOne(id);

    const isOwner = post.userId === userId;
    const isAdmin = role === Role.ADMIN;

    if (!isOwner && !isAdmin) throw new ForbiddenException('Akses ditolak');

    return this.prisma.post.delete({ where: { id } });
  }

  // like post
  async like(id: number) {
    const post = await this.findOne(id);

    return this.prisma.post.update({
      where: { id },
      data: { likes: post.likes + 1 },
    });
  }
}