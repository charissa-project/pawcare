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
                fullname: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                id: number;
                photoUrl: string | null;
                createdAt: Date;
                updatedAt: Date;
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
        pet: {
            id: number;
            photoUrl: string | null;
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
        photoUrl: string | null;
        type: string;
        doctorId: number;
        petId: number;
        appointmentDate: Date;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        consultationFee: number | null;
    }>;
    findAll(): Promise<({
        doctor: {
            user: {
                fullname: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                id: number;
                photoUrl: string | null;
                createdAt: Date;
                updatedAt: Date;
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
        pet: {
            owner: {
                fullname: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                id: number;
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
        photoUrl: string | null;
        type: string;
        doctorId: number;
        petId: number;
        appointmentDate: Date;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        consultationFee: number | null;
    })[]>;
    findMine(userId: number): Promise<({
        doctor: {
            user: {
                fullname: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                id: number;
                photoUrl: string | null;
                createdAt: Date;
                updatedAt: Date;
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
        pet: {
            id: number;
            photoUrl: string | null;
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
        photoUrl: string | null;
        type: string;
        doctorId: number;
        petId: number;
        appointmentDate: Date;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        consultationFee: number | null;
    })[]>;
    findByDoctor(userId: number): Promise<({
        doctor: {
            user: {
                fullname: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                id: number;
                photoUrl: string | null;
                createdAt: Date;
                updatedAt: Date;
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
        pet: {
            owner: {
                fullname: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                id: number;
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
        photoUrl: string | null;
        type: string;
        doctorId: number;
        petId: number;
        appointmentDate: Date;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        consultationFee: number | null;
    })[]>;
    findOne(id: number, userId: number, role: Role): Promise<{
        doctor: {
            user: {
                fullname: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                id: number;
                photoUrl: string | null;
                createdAt: Date;
                updatedAt: Date;
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
        pet: {
            owner: {
                fullname: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                id: number;
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
        photoUrl: string | null;
        type: string;
        doctorId: number;
        petId: number;
        appointmentDate: Date;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        consultationFee: number | null;
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
