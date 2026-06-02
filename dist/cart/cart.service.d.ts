import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    add(userId: number, dto: AddToCartDto): Promise<{
        id: number;
        productId: number;
        quantity: number;
        cartId: number;
    }>;
    getCart(userId: number): Promise<({
        items: ({
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
            productId: number;
            quantity: number;
            cartId: number;
        })[];
    } & {
        id: number;
        userId: number;
    }) | null>;
    remove(userId: number, cartItemId: number): Promise<{
        id: number;
        productId: number;
        quantity: number;
        cartId: number;
    }>;
    updateQty(cartItemId: number, quantity: number): Promise<{
        id: number;
        productId: number;
        quantity: number;
        cartId: number;
    }>;
}
