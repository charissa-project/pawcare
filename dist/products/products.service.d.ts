import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductCategory } from '@prisma/client';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateProductDto): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        price: number;
        category: import("@prisma/client").$Enums.ProductCategory;
        description: string | null;
        imageUrl: string | null;
    }>;
    findAll(category?: ProductCategory): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        price: number;
        category: import("@prisma/client").$Enums.ProductCategory;
        description: string | null;
        imageUrl: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        price: number;
        category: import("@prisma/client").$Enums.ProductCategory;
        description: string | null;
        imageUrl: string | null;
    }>;
    update(id: number, dto: UpdateProductDto): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        price: number;
        category: import("@prisma/client").$Enums.ProductCategory;
        description: string | null;
        imageUrl: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        price: number;
        category: import("@prisma/client").$Enums.ProductCategory;
        description: string | null;
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
