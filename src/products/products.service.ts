import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductCategory } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto, file?: Express.Multer.File) {
  const imageUrl = file ? file.path : null;
  
  return this.prisma.product.create({
    data: {
      ...dto,
      imageUrl,
    },
  });
}

  async findAll(category?: ProductCategory) {
    return this.prisma.product.findMany({
      where: category ? { category } : {},
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Produk tidak ditemukan');
    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.findOne(id);
    return this.prisma.product.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.product.delete({ where: { id } });
  }

  async updatePhoto(id: number, file: Express.Multer.File) {
  if (!file) throw new BadRequestException('File tidak ditemukan');

  const product = await this.prisma.product.findUnique({ where: { id } });
  if (!product) throw new NotFoundException('Produk tidak ditemukan');

  const imageUrl = file.path;

  const updated = await this.prisma.product.update({
    where: { id },
    data: { imageUrl },
  });

  return {
    success: true,
    message: 'Foto produk berhasil diupload',
    data: { imageUrl: updated.imageUrl },
  };
}

}