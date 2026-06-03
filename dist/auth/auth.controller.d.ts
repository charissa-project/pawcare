import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            fullname: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        };
    }>;
    login(dto: LoginDto): Promise<{
        success: boolean;
        message: string;
        data: {
            access_token: string;
            user: {
                id: number;
                fullname: string;
                email: string;
                role: import("@prisma/client").$Enums.Role;
            };
        };
    }>;
    logout(): {
        success: boolean;
        message: string;
    };
}
