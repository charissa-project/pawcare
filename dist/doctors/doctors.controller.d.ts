import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
export declare class DoctorsController {
    private doctorService;
    constructor(doctorService: DoctorsService);
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: {
            user: {
                fullname: string;
                email: string;
            };
            schedule: string;
            id: number;
            userId: number;
            specialization: string;
            experience: number;
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
            schedule: string;
            id: number;
            userId: number;
            specialization: string;
            experience: number;
            rating: number | null;
            isAvailable: boolean;
        };
    }>;
    getSchedule(userId: number): Promise<{
        success: boolean;
        data: {
            id: number;
            day: string;
            doctorId: number;
            startTime: string;
            endTime: string;
        }[];
    }>;
    addSchedule(userId: number, body: {
        day: string;
        startTime: string;
        endTime: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            day: string;
            doctorId: number;
            startTime: string;
            endTime: string;
        };
    }>;
    removeSchedule(userId: number, scheduleId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    create(dto: CreateDoctorDto, file: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: {
            schedule: string;
            id: number;
            userId: number;
            specialization: string;
            experience: number;
            rating: number | null;
            isAvailable: boolean;
        };
    }>;
    update(id: number, dto: any): Promise<{
        success: boolean;
        message: string;
        data: {
            schedule: string;
            id: number;
            userId: number;
            specialization: string;
            experience: number;
            rating: number | null;
            isAvailable: boolean;
        };
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
