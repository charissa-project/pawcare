import { UpdatePaymentStatusDto } from './dto/update-payment.dto';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order.dto';
import { Role } from '@prisma/client';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(userId: number, dto: CreateOrderDto): Promise<{
        orderItems: ({
            product: {
                description: string | null;
                id: number;
                createdAt: Date;
                name: string;
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
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        id: number;
        createdAt: Date;
        userId: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        paymentProof: string | null;
    }>;
    findMine(userId: number): Promise<({
        orderItems: ({
            product: {
                description: string | null;
                id: number;
                createdAt: Date;
                name: string;
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
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        id: number;
        createdAt: Date;
        userId: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalPrice: number;
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
                description: string | null;
                id: number;
                createdAt: Date;
                name: string;
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
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        id: number;
        createdAt: Date;
        userId: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalPrice: number;
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
                description: string | null;
                id: number;
                createdAt: Date;
                name: string;
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
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        id: number;
        createdAt: Date;
        userId: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        paymentProof: string | null;
    }>;
    updateStatus(id: number, body: UpdateOrderStatusDto): Promise<{
        orderItems: ({
            product: {
                description: string | null;
                id: number;
                createdAt: Date;
                name: string;
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
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        id: number;
        createdAt: Date;
        userId: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        paymentProof: string | null;
    }>;
    cancel(id: number, userId: number): Promise<{
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        id: number;
        createdAt: Date;
        userId: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        paymentProof: string | null;
    }>;
    updatePaymentStatus(id: number, body: UpdatePaymentStatusDto): Promise<{
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        id: number;
        createdAt: Date;
        userId: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        paymentProof: string | null;
    }>;
    uploadProof(id: number, userId: number, file: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: {
            paymentProof: string | null;
        };
    }>;
}
