import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(userId: number, dto: AddToCartDto): Promise<{
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
    removeItem(id: number, userId: number): Promise<{
        id: number;
        cartId: number;
        productId: number;
        quantity: number;
    }>;
}
