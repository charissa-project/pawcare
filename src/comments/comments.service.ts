import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Role } from '@prisma/client';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, postId: number, dto: CreateCommentDto) {
    // pastikan post ada
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new NotFoundException('Post tidak ditemukan');

    return this.prisma.comment.create({
      data: {
        content: dto.content,
        userId,
        postId,
      },
      include: {
        user: { select: { id: true, fullname: true } },
      },
    });
  }

  async findByPost(postId: number) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new NotFoundException('Post tidak ditemukan');

    return this.prisma.comment.findMany({
      where: { postId },
      include: {
        user: { select: { id: true, fullname: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async remove(id: number, userId: number, role: Role) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) throw new NotFoundException('Komentar tidak ditemukan');

    const isOwner = comment.userId === userId;
    const isAdmin = role === Role.ADMIN;

    if (!isOwner && !isAdmin) throw new ForbiddenException('Akses ditolak');

    return this.prisma.comment.delete({ where: { id } });
  }
}