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
        paymentProof: string | null;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
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
        paymentProof: string | null;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
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
        paymentProof: string | null;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
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
        paymentProof: string | null;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
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
        paymentProof: string | null;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
    }>;
    cancel(id: number, userId: number): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        paymentProof: string | null;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
    }>;
    updatePaymentStatus(id: number, body: UpdatePaymentStatusDto): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        paymentProof: string | null;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
    }>;
    uploadProof(id: number, userId: number, file: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: {
            paymentProof: string | null;
        };
    }>;
    checkout(userId: number): Promise<{
        success: boolean;
        message: string;
        data: {
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
            paymentProof: string | null;
            paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        };
    }>;
}
