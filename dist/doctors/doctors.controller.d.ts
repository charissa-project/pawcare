import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { AddScheduleDto } from './dto/add-schedule.dto';
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
            startTime: string;
            endTime: string;
            doctorId: number;
        }[];
    }>;
    addSchedule(userId: number, body: AddScheduleDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            day: string;
            startTime: string;
            endTime: string;
            doctorId: number;
        };
    }>;
    updateSchedule(userId: number, scheduleId: number, body: AddScheduleDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            day: string;
            startTime: string;
            endTime: string;
            doctorId: number;
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
