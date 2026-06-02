import { Role } from '@prisma/client';
export declare class UpdateUserDto {
    fullname?: string;
    email?: string;
    password?: string;
    role?: Role;
}
