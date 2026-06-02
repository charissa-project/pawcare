import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Role } from '@prisma/client';
import { UpdateOrderStatusDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(userId: number, dto: CreateOrderDto): Promise<{
        orderItems: ({
            product: {
                id: number;
                createdAt: Date;
                name: string;
                description: string | null;
                price: number;
                stock: number;
                category: import("@prisma/client").$Enums.ProductCategory;
                imageUrl: string | null;
            };
        } & {
            id: number;
            price: number;
            productId: number;
            quantity: number;
            orderId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        paymentProof: string | null;
    }>;
    findMine(userId: number): Promise<({
        orderItems: ({
            product: {
                id: number;
                createdAt: Date;
                name: string;
                description: string | null;
                price: number;
                stock: number;
                category: import("@prisma/client").$Enums.ProductCategory;
                imageUrl: string | null;
            };
        } & {
            id: number;
            price: number;
            productId: number;
            quantity: number;
            orderId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        paymentProof: string | null;
    })[]>;
    findAll(): Promise<({
        user: {
            fullname: string;
            email: string;
            id: number;
        };
        orderItems: ({
            product: {
                id: number;
                createdAt: Date;
                name: string;
                description: string | null;
                price: number;
                stock: number;
                category: import("@prisma/client").$Enums.ProductCategory;
                imageUrl: string | null;
            };
        } & {
            id: number;
            price: number;
            productId: number;
            quantity: number;
            orderId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        paymentProof: string | null;
    })[]>;
    findOne(id: number, userId: number, role: Role): Promise<{
        user: {
            fullname: string;
            email: string;
            id: number;
        };
        orderItems: ({
            product: {
                id: number;
                createdAt: Date;
                name: string;
                description: string | null;
                price: number;
                stock: number;
                category: import("@prisma/client").$Enums.ProductCategory;
                imageUrl: string | null;
            };
        } & {
            id: number;
            price: number;
            productId: number;
            quantity: number;
            orderId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        paymentProof: string | null;
    }>;
    updateStatus(id: number, body: UpdateOrderStatusDto): Promise<{
        orderItems: ({
            product: {
                id: number;
                createdAt: Date;
                name: string;
                description: string | null;
                price: number;
                stock: number;
                category: import("@prisma/client").$Enums.ProductCategory;
                imageUrl: string | null;
            };
        } & {
            id: number;
            price: number;
            productId: number;
            quantity: number;
            orderId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        paymentProof: string | null;
    }>;
    cancel(id: number, userId: number): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        paymentProof: string | null;
    }>;
    verifyPayment(id: number): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        paymentProof: string | null;
    }>;
}
