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
        doctor: {
            user: {
                fullname: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                id: number;
                photoUrl: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            schedule: string;
            id: number;
            userId: number;
            specialization: string;
            experience: number;
            rating: number | null;
            isAvailable: boolean;
        };
        pet: {
            owner: {
                fullname: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                id: number;
                photoUrl: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            photoUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            userId: number;
            species: string;
            breed: string;
            age: number;
            gender: string;
            weight: number;
            healthStatus: string;
            lastVaccine: Date | null;
            nextVaccine: Date | null;
        };
    } & {
        id: number;
        createdAt: Date;
        doctorId: number;
        petId: number;
        diagnosis: string;
        treatment: string;
        notes: string | null;
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
    updatePaymentStatus(id: number, body: {
        paymentStatus: 'PAID' | 'REJECTED';
    }): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
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
