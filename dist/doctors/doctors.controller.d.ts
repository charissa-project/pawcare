import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
export declare class DoctorsController {
    private doctorService;
    constructor(doctorService: DoctorsService);
    create(dto: CreateDoctorDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            userId: number;
            specialization: string;
            experience: number;
            schedule: string;
            rating: number | null;
            isAvailable: boolean;
        };
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: ({
            user: {
                fullname: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                id: number;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            userId: number;
            specialization: string;
            experience: number;
            schedule: string;
            rating: number | null;
            isAvailable: boolean;
        })[];
    }>;
}
