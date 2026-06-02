import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(userId: number, dto: AddToCartDto): Promise<{
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
    removeItem(id: number, userId: number): Promise<{
        id: number;
        productId: number;
        quantity: number;
        cartId: number;
    }>;
    updateCart(id: number, dto: UpdateCartDto): Promise<{
        id: number;
        productId: number;
        quantity: number;
        cartId: number;
    }>;
}
