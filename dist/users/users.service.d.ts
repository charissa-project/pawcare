import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
    findMe(userId: number): Promise<{
        success: boolean;
        data: {
            fullname: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            id: number;
            photoUrl: string | null;
            createdAt: Date;
        };
    }>;
    create(dto: CreateUserDto): Promise<{
        success: boolean;
        message: string;
        data: {
            fullname: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            id: number;
            createdAt: Date;
        };
    }>;
    update(id: number, dto: UpdateUserDto): Promise<{
        success: boolean;
        message: string;
        data: {
            fullname: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            id: number;
            createdAt: Date;
        };
    }>;
    updatePhoto(userId: number, file: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: {
            photoUrl: string | null;
        };
    }>;
    updateRole(id: number, role: string): Promise<{
        success: boolean;
        message: string;
        data: {
            fullname: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            id: number;
        };
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
