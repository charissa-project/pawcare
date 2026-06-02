import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async add(userId: number, dto: AddToCartDto) {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
      });
    }

    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException('Produk tidak ditemukan');
    }

    const existingItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: dto.productId,
      },
    });

    if (existingItem) {
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + dto.quantity,
        },
      });
    }

    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: dto.productId,
        quantity: dto.quantity,
      },
    });
  }

  async getCart(userId: number) {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });
  }

  async remove(userId: number, cartItemId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) throw new NotFoundException('Cart tidak ditemukan');

    return this.prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  }

async updateQty(cartItemId: number, quantity: number) {
  return this.prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
  });
}
}