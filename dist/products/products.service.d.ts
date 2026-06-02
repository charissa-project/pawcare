import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductCategory } from '@prisma/client';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateProductDto, file?: Express.Multer.File): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        description: string | null;
        price: number;
        stock: number;
        category: import("@prisma/client").$Enums.ProductCategory;
        imageUrl: string | null;
    }>;
    findAll(category?: ProductCategory): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        description: string | null;
        price: number;
        stock: number;
        category: import("@prisma/client").$Enums.ProductCategory;
        imageUrl: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        description: string | null;
        price: number;
        stock: number;
        category: import("@prisma/client").$Enums.ProductCategory;
        imageUrl: string | null;
    }>;
    update(id: number, dto: UpdateProductDto): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        description: string | null;
        price: number;
        stock: number;
        category: import("@prisma/client").$Enums.ProductCategory;
        imageUrl: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        description: string | null;
        price: number;
        stock: number;
        category: import("@prisma/client").$Enums.ProductCategory;
        imageUrl: string | null;
    }>;
    updatePhoto(id: number, file: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: {
            imageUrl: string | null;
        };
    }>;
}
