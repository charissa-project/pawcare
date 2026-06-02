import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Role } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateOrderDto) {
    let totalPrice = 0;
    const itemsData: { productId: number; quantity: number; price: number }[] = [];

    for (const item of dto.items) {
      const product = await this.prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) throw new NotFoundException(`Produk ID ${item.productId} tidak ditemukan`);
      if (product.stock < item.quantity) throw new BadRequestException(`Stok produk ${product.name} tidak cukup`);

      const subtotal = product.price * item.quantity;
      totalPrice += subtotal;
      itemsData.push({ productId: item.productId, quantity: item.quantity, price: subtotal });
    }

    const order = await this.prisma.order.create({
      data: {
        userId,
        totalPrice,
        status: 'PENDING',
        orderItems: { create: itemsData },
      },
      include: { orderItems: { include: { product: true } } },
    });

    for (const item of dto.items) {
      await this.prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return order;
  }

  async findAllByUser(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { orderItems: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        user: { select: { id: true, fullname: true, email: true } },
        orderItems: { include: { product: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, userId: number, role: Role) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, fullname: true, email: true } },
        orderItems: { include: { product: true } },
      },
    });

    if (!order) throw new NotFoundException('Order tidak ditemukan');
    if (order.userId !== userId && role !== Role.ADMIN) throw new ForbiddenException('Akses ditolak');

    return order;
  }

  async updateStatus(id: number, status: string) {
    const validStatus = ['PENDING', 'SHIPPED', 'DELIVERED'];
    if (!validStatus.includes(status)) throw new BadRequestException('Status tidak valid');

    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('Order tidak ditemukan');

    return this.prisma.order.update({
      where: { id },
      data: { status },
      include: { orderItems: { include: { product: true } } },
    });
  }

  async cancel(id: number, userId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { orderItems: true },
    });

    if (!order) throw new NotFoundException('Order tidak ditemukan');
    if (order.userId !== userId) throw new ForbiddenException('Akses ditolak');
    if (order.status !== 'PENDING') throw new BadRequestException('Order yang sudah diproses tidak bisa dibatalkan');

    for (const item of order.orderItems) {
      await this.prisma.product.update({
        where: { id: item.productId },
        data: { stock: { increment: item.quantity } },
      });
    }

    return this.prisma.order.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
  }

async verifyPayment(id: number) {
  const order = await this.prisma.order.findUnique({
    where: { id },
  });

  if (!order) {
    throw new NotFoundException('Order tidak ditemukan');
  }

  return this.prisma.order.update({
    where: { id },
    data: {
      paymentStatus: 'PAID',
    },
  });
}

}