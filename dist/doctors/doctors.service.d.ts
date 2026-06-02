import { PrismaService } from '../prisma/prisma.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { AddScheduleDto } from './dto/add-schedule.dto';
export declare class DoctorsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateDoctorDto, file?: Express.Multer.File): Promise<{
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
    findMe(userId: number): Promise<{
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
    removeSchedule(userId: number, scheduleId: number): Promise<{
        success: boolean;
        message: string;
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
