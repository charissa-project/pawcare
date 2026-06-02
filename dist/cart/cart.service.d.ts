import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    add(userId: number, dto: AddToCartDto): Promise<{
        id: number;
        cartId: number;
        productId: number;
        quantity: number;
    }>;
    getCart(userId: number): Promise<({
        items: ({
            product: {
                id: number;
                name: string;
                price: number;
                stock: number;
                category: import("@prisma/client").$Enums.ProductCategory;
                description: string | null;
                imageUrl: string | null;
                createdAt: Date;
            };
        } & {
            id: number;
            cartId: number;
            productId: number;
            quantity: number;
        })[];
    } & {
        id: number;
        userId: number;
    }) | null>;
    remove(userId: number, cartItemId: number): Promise<{
        id: number;
        cartId: number;
        productId: number;
        quantity: number;
    }>;
}
