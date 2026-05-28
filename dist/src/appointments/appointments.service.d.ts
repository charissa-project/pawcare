import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Role } from '@prisma/client';
export declare class AppointmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, dto: CreateAppointmentDto): Promise<{
        doctor: {
            user: {
                id: number;
                fullname: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
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
            createdAt: Date;
            updatedAt: Date;
            name: string;
            userId: number;
            species: string;
            breed: string;
            age: number;
            gender: string;
            weight: number;
            healthStatus: string;
            lastVaccine: Date | null;
            nextVaccine: Date | null;
        };
    } & {
        id: number;
        petId: number;
        doctorId: number;
        appointmentDate: Date;
        type: string;
        consultationFee: number | null;
        status: import("@prisma/client").$Enums.AppointmentStatus;
    }>;
    findAll(): Promise<({
        doctor: {
            user: {
                id: number;
                fullname: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
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
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            userId: number;
            species: string;
            breed: string;
            age: number;
            gender: string;
            weight: number;
            healthStatus: string;
            lastVaccine: Date | null;
            nextVaccine: Date | null;
        };
    } & {
        id: number;
        petId: number;
        doctorId: number;
        appointmentDate: Date;
        type: string;
        consultationFee: number | null;
        status: import("@prisma/client").$Enums.AppointmentStatus;
    })[]>;
    findAllByUser(userId: number): Promise<({
        doctor: {
            user: {
                id: number;
                fullname: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
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
            createdAt: Date;
            updatedAt: Date;
            name: string;
            userId: number;
            species: string;
            breed: string;
            age: number;
            gender: string;
            weight: number;
            healthStatus: string;
            lastVaccine: Date | null;
            nextVaccine: Date | null;
        };
    } & {
        id: number;
        petId: number;
        doctorId: number;
        appointmentDate: Date;
        type: string;
        consultationFee: number | null;
        status: import("@prisma/client").$Enums.AppointmentStatus;
    })[]>;
    findAllByDoctor(userId: number): Promise<({
        doctor: {
            user: {
                id: number;
                fullname: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
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
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            userId: number;
            species: string;
            breed: string;
            age: number;
            gender: string;
            weight: number;
            healthStatus: string;
            lastVaccine: Date | null;
            nextVaccine: Date | null;
        };
    } & {
        id: number;
        petId: number;
        doctorId: number;
        appointmentDate: Date;
        type: string;
        consultationFee: number | null;
        status: import("@prisma/client").$Enums.AppointmentStatus;
    })[]>;
    findOne(id: number, userId: number, role: Role): Promise<{
        doctor: {
            user: {
                id: number;
                fullname: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
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
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            userId: number;
            species: string;
            breed: string;
            age: number;
            gender: string;
            weight: number;
            healthStatus: string;
            lastVaccine: Date | null;
            nextVaccine: Date | null;
        };
    } & {
        id: number;
        petId: number;
        doctorId: number;
        appointmentDate: Date;
        type: string;
        consultationFee: number | null;
        status: import("@prisma/client").$Enums.AppointmentStatus;
    }>;
    updateStatus(id: number, userId: number, role: Role, dto: UpdateAppointmentDto): Promise<{
        id: number;
        petId: number;
        doctorId: number;
        appointmentDate: Date;
        type: string;
        consultationFee: number | null;
        status: import("@prisma/client").$Enums.AppointmentStatus;
    }>;
    cancel(id: number, userId: number): Promise<{
        id: number;
        petId: number;
        doctorId: number;
        appointmentDate: Date;
        type: string;
        consultationFee: number | null;
        status: import("@prisma/client").$Enums.AppointmentStatus;
    }>;
}
