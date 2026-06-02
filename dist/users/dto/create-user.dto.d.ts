import { Role } from '@prisma/client';
export declare class CreateUserDto {
    fullname: string;
    email: string;
    password: string;
    role?: Role;
}
