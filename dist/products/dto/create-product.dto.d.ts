import { ProductCategory } from '@prisma/client';
export declare class CreateProductDto {
    name: string;
    price: number;
    category: ProductCategory;
    description?: string;
}
