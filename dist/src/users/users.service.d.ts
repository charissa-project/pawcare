import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            fullname: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
        }[];
    }>;
}
