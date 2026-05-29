import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Role } from '@prisma/client';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    create(userId: number, dto: CreateAppointmentDto): Promise<{
        doctor: {
            user: {
                id: number;
                fullname: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                photoUrl: string | null;
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
        };
        pet: {
            id: number;
            photoUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            species: string;
            breed: string;
            age: number;
            gender: string;
            weight: number;
            healthStatus: string;
            lastVaccine: Date | null;
            nextVaccine: Date | null;
            userId: number;
        };
    } & {
        id: number;
        photoUrl: string | null;
        appointmentDate: Date;
        type: string;
        consultationFee: number | null;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        petId: number;
        doctorId: number;
    }>;
    findAll(): Promise<({
        doctor: {
            user: {
                id: number;
                fullname: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                photoUrl: string | null;
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
        };
        pet: {
            owner: {
                id: number;
                fullname: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                photoUrl: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            photoUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            species: string;
            breed: string;
            age: number;
            gender: string;
            weight: number;
            healthStatus: string;
            lastVaccine: Date | null;
            nextVaccine: Date | null;
            userId: number;
        };
    } & {
        id: number;
        photoUrl: string | null;
        appointmentDate: Date;
        type: string;
        consultationFee: number | null;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        petId: number;
        doctorId: number;
    })[]>;
    findMine(userId: number): Promise<({
        doctor: {
            user: {
                id: number;
                fullname: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                photoUrl: string | null;
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
        };
        pet: {
            id: number;
            photoUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            species: string;
            breed: string;
            age: number;
            gender: string;
            weight: number;
            healthStatus: string;
            lastVaccine: Date | null;
            nextVaccine: Date | null;
            userId: number;
        };
    } & {
        id: number;
        photoUrl: string | null;
        appointmentDate: Date;
        type: string;
        consultationFee: number | null;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        petId: number;
        doctorId: number;
    })[]>;
    findByDoctor(userId: number): Promise<({
        doctor: {
            user: {
                id: number;
                fullname: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                photoUrl: string | null;
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
        };
        pet: {
            owner: {
                id: number;
                fullname: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                photoUrl: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            photoUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            species: string;
            breed: string;
            age: number;
            gender: string;
            weight: number;
            healthStatus: string;
            lastVaccine: Date | null;
            nextVaccine: Date | null;
            userId: number;
        };
    } & {
        id: number;
        photoUrl: string | null;
        appointmentDate: Date;
        type: string;
        consultationFee: number | null;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        petId: number;
        doctorId: number;
    })[]>;
    findOne(id: number, userId: number, role: Role): Promise<{
        doctor: {
            user: {
                id: number;
                fullname: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                photoUrl: string | null;
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
        };
        pet: {
            owner: {
                id: number;
                fullname: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                photoUrl: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            photoUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            species: string;
            breed: string;
            age: number;
            gender: string;
            weight: number;
            healthStatus: string;
            lastVaccine: Date | null;
            nextVaccine: Date | null;
            userId: number;
        };
    } & {
        id: number;
        photoUrl: string | null;
        appointmentDate: Date;
        type: string;
        consultationFee: number | null;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        petId: number;
        doctorId: number;
    }>;
    updateStatus(id: number, userId: number, role: Role, dto: UpdateAppointmentDto): Promise<{
        id: number;
        photoUrl: string | null;
        appointmentDate: Date;
        type: string;
        consultationFee: number | null;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        petId: number;
        doctorId: number;
    }>;
    cancel(id: number, userId: number): Promise<{
        id: number;
        photoUrl: string | null;
        appointmentDate: Date;
        type: string;
        consultationFee: number | null;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        petId: number;
        doctorId: number;
    }>;
    uploadPhoto(id: number, userId: number, file: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: {
            photoUrl: string | null;
        };
    }>;
}
