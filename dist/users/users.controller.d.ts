import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
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
    uploadPhoto(userId: number, file: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: {
            photoUrl: string | null;
        };
    }>;
}
