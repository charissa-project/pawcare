"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        let totalPrice = 0;
        const itemsData = [];
        for (const item of dto.items) {
            const product = await this.prisma.product.findUnique({ where: { id: item.productId } });
            if (!product)
                throw new common_1.NotFoundException(`Produk ID ${item.productId} tidak ditemukan`);
            if (product.stock < item.quantity)
                throw new common_1.BadRequestException(`Stok produk ${product.name} tidak cukup`);
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
    async findAllByUser(userId) {
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
    async findOne(id, userId, role) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                user: { select: { id: true, fullname: true, email: true } },
                orderItems: { include: { product: true } },
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order tidak ditemukan');
        const isOwner = order.userId === userId;
        const isAdmin = role === client_1.Role.ADMIN;
        if (!isOwner && !isAdmin)
            throw new common_1.ForbiddenException('Akses ditolak');
        return order;
    }
    async updateStatus(id, status) {
        const validStatus = Object.values(client_1.OrderStatus);
        if (!validStatus.includes(status))
            throw new common_1.BadRequestException('Status tidak valid');
        const order = await this.prisma.order.findUnique({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException('Order tidak ditemukan');
        return this.prisma.order.update({
            where: { id },
            data: { status },
            include: { orderItems: { include: { product: true } } },
        });
    }
    async cancel(id, userId) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: { orderItems: true },
        });
        if (!order)
            throw new common_1.NotFoundException('Order tidak ditemukan');
        if (order.userId !== userId)
            throw new common_1.ForbiddenException('Akses ditolak');
        if (order.status !== 'PENDING')
            throw new common_1.BadRequestException('Order yang sudah diproses tidak bisa dibatalkan');
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
    async updatePaymentStatus(id, paymentStatus) {
        const order = await this.prisma.order.findUnique({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException('Order tidak ditemukan');
        return this.prisma.order.update({
            where: { id },
            data: { paymentStatus },
        });
    }
    async uploadProof(id, userId, file) {
        if (!file)
            throw new common_1.BadRequestException('File tidak ditemukan');
        const order = await this.prisma.order.findUnique({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException('Order tidak ditemukan');
        if (order.userId !== userId)
            throw new common_1.ForbiddenException('Akses ditolak');
        const updated = await this.prisma.order.update({
            where: { id },
            data: { paymentProof: file.path },
        });
        return {
            success: true,
            message: 'Bukti transfer berhasil diupload',
            data: { paymentProof: updated.paymentProof },
        };
    }
    async checkout(userId) {
        const cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: { product: true }
                }
            }
        });
        if (!cart || cart.items.length === 0) {
            throw new common_1.BadRequestException('Cart kosong');
        }
        let totalPrice = 0;
        const itemsData = [];
        for (const item of cart.items) {
            const product = item.product;
            if (product.stock < item.quantity) {
                throw new common_1.BadRequestException(`Stok ${product.name} tidak cukup`);
            }
            const subtotal = product.price * item.quantity;
            totalPrice += subtotal;
            itemsData.push({
                productId: item.productId,
                quantity: item.quantity,
                price: subtotal
            });
        }
        const order = await this.prisma.order.create({
            data: {
                userId,
                totalPrice,
                status: 'PENDING',
                orderItems: {
                    create: itemsData
                }
            },
            include: {
                orderItems: {
                    include: { product: true }
                }
            }
        });
        for (const item of cart.items) {
            await this.prisma.product.update({
                where: { id: item.productId },
                data: {
                    stock: {
                        decrement: item.quantity
                    }
                }
            });
        }
        await this.prisma.cartItem.deleteMany({
            where: { cartId: cart.id }
        });
        return {
            success: true,
            message: 'Checkout berhasil',
            data: order
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map