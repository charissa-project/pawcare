import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: {
            fullname: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            id: number;
            createdAt: Date;
        }[];
    }>;
    updatePhoto(userId: number, file: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: {
            photoUrl: string | null;
        };
    }>;
}
