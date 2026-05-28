import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductCategory } from '@prisma/client';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(dto: CreateProductDto): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        price: number;
        category: import("@prisma/client").$Enums.ProductCategory;
        description: string | null;
    }>;
    findAll(category?: ProductCategory): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        price: number;
        category: import("@prisma/client").$Enums.ProductCategory;
        description: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        price: number;
        category: import("@prisma/client").$Enums.ProductCategory;
        description: string | null;
    }>;
    update(id: number, dto: UpdateProductDto): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        price: number;
        category: import("@prisma/client").$Enums.ProductCategory;
        description: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        price: number;
        category: import("@prisma/client").$Enums.ProductCategory;
        description: string | null;
    }>;
}
