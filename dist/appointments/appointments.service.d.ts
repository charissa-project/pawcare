import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Role } from '@prisma/client';
export declare class AppointmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, dto: CreateAppointmentDto): Promise<{
        id: number;
        photoUrl: string | null;
        type: string;
        doctorId: number;
        petId: number;
        appointmentDate: Date;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        consultationFee: number | null;
    }>;
    findAll(): Promise<{
        doctor: {
            user: {
                fullname: string;
                email: string;
                id: number;
            };
            schedule: string;
            id: number;
            specialization: string;
            experience: number;
            isAvailable: boolean;
        };
        pet: {
            id: number;
            photoUrl: string | null;
            name: string;
            species: string;
            breed: string;
            age: number;
            gender: string;
            weight: number;
            healthStatus: string;
            owner: {
                fullname: string;
                email: string;
                role: import("@prisma/client").$Enums.Role;
                id: number;
            };
        };
        id: number;
        type: string;
        doctorId: number;
        petId: number;
        appointmentDate: Date;
        notes: never;
        status: import("@prisma/client").$Enums.AppointmentStatus;
    }[]>;
    findAllByUser(userId: number): Promise<{
        doctor: {
            user: {
                fullname: string;
                email: string;
                id: number;
            };
            schedule: string;
            id: number;
            specialization: string;
            experience: number;
            isAvailable: boolean;
        };
        pet: {
            id: number;
            photoUrl: string | null;
            name: string;
            species: string;
            breed: string;
            age: number;
            gender: string;
            weight: number;
            healthStatus: string;
            owner: {
                fullname: string;
                email: string;
                role: import("@prisma/client").$Enums.Role;
                id: number;
            };
        };
        id: number;
        type: string;
        doctorId: number;
        petId: number;
        appointmentDate: Date;
        notes: never;
        status: import("@prisma/client").$Enums.AppointmentStatus;
    }[]>;
    findAllByDoctor(userId: number): Promise<{
        doctor: {
            user: {
                fullname: string;
                email: string;
                id: number;
            };
            schedule: string;
            id: number;
            specialization: string;
            experience: number;
            isAvailable: boolean;
        };
        pet: {
            id: number;
            photoUrl: string | null;
            name: string;
            species: string;
            breed: string;
            age: number;
            gender: string;
            weight: number;
            healthStatus: string;
            owner: {
                fullname: string;
                email: string;
                role: import("@prisma/client").$Enums.Role;
                id: number;
            };
        };
        id: number;
        type: string;
        doctorId: number;
        petId: number;
        appointmentDate: Date;
        notes: never;
        status: import("@prisma/client").$Enums.AppointmentStatus;
    }[]>;
    findOne(id: number, userId: number, role: Role): Promise<{
        doctor: {
            user: {
                fullname: string;
                email: string;
                id: number;
            };
            schedule: string;
            id: number;
            userId: number;
            specialization: string;
            experience: number;
            isAvailable: boolean;
        };
        pet: {
            id: number;
            photoUrl: string | null;
            name: string;
            userId: number;
            species: string;
            breed: string;
            age: number;
            gender: string;
            weight: number;
            healthStatus: string;
            owner: {
                fullname: string;
                email: string;
                role: import("@prisma/client").$Enums.Role;
                id: number;
            };
        };
        id: number;
        type: string;
        doctorId: number;
        petId: number;
        appointmentDate: Date;
        notes: never;
        status: import("@prisma/client").$Enums.AppointmentStatus;
    }>;
    updateStatus(id: number, userId: number, role: Role, dto: UpdateAppointmentDto): Promise<{
        id: number;
        photoUrl: string | null;
        type: string;
        doctorId: number;
        petId: number;
        appointmentDate: Date;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        consultationFee: number | null;
    }>;
    cancel(id: number, userId: number): Promise<{
        id: number;
        photoUrl: string | null;
        type: string;
        doctorId: number;
        petId: number;
        appointmentDate: Date;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        consultationFee: number | null;
    }>;
    update(id: number, userId: number, role: Role, dto: UpdateAppointmentDto): Promise<{
        id: number;
        photoUrl: string | null;
        type: string;
        doctorId: number;
        petId: number;
        appointmentDate: Date;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        consultationFee: number | null;
    }>;
}
