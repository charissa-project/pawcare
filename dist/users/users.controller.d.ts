import { UsersService } from './users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
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
    getMe(userId: number): Promise<{
        success: boolean;
        data: {
            fullname: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            id: number;
            createdAt: Date;
            photoUrl: string | null;
        };
    }>;
    uploadPhoto(userId: number, file: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: {
            photoUrl: string | null;
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
    updateRole(id: number, body: {
        role: string;
    }): Promise<{
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
