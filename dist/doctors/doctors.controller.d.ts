import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
export declare class DoctorsController {
    private doctorService;
    constructor(doctorService: DoctorsService);
    create(dto: CreateDoctorDto, file: Express.Multer.File): Promise<{
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
        data: {
            user: {
                fullname: string;
                email: string;
            };
            id: number;
            userId: number;
            specialization: string;
            experience: number;
            schedule: string;
        }[];
    }>;
    getMe(userId: number): Promise<{
        success: boolean;
        data: {
            user: {
                fullname: string;
                email: string;
                id: number;
                photoUrl: string | null;
            };
        } & {
            id: number;
            userId: number;
            specialization: string;
            experience: number;
            schedule: string;
            rating: number | null;
            isAvailable: boolean;
        };
    }>;
    getSchedule(userId: number): Promise<{
        success: boolean;
        data: {
            schedule: string;
        };
    }>;
    updateSchedule(userId: number, body: {
        schedule: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: {
            schedule: string;
        };
    }>;
}
