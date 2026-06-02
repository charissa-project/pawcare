import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
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
                price: number;
                stock: number;
                category: import("@prisma/client").$Enums.ProductCategory;
                description: string | null;
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
        status: string;
        totalPrice: number;
    }>;
    findMine(userId: number): Promise<({
        orderItems: ({
            product: {
                id: number;
                createdAt: Date;
                name: string;
                price: number;
                stock: number;
                category: import("@prisma/client").$Enums.ProductCategory;
                description: string | null;
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
        status: string;
        totalPrice: number;
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
                price: number;
                stock: number;
                category: import("@prisma/client").$Enums.ProductCategory;
                description: string | null;
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
        status: string;
        totalPrice: number;
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
                price: number;
                stock: number;
                category: import("@prisma/client").$Enums.ProductCategory;
                description: string | null;
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
        status: string;
        totalPrice: number;
    }>;
    updateStatus(id: number, status: string): Promise<{
        orderItems: ({
            product: {
                id: number;
                createdAt: Date;
                name: string;
                price: number;
                stock: number;
                category: import("@prisma/client").$Enums.ProductCategory;
                description: string | null;
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
        status: string;
        totalPrice: number;
    }>;
    cancel(id: number, userId: number): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        status: string;
        totalPrice: number;
    }>;
}
