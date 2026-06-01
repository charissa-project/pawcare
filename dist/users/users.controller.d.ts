import { UsersService } from './users.service';
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
            photoUrl: string | null;
            createdAt: Date;
        };
    }>;
    uploadPhoto(userId: number, file: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: {
            photoUrl: string | null;
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
