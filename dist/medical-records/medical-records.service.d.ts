import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { Role } from '@prisma/client';
export declare class MedicalRecordsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, dto: CreateMedicalRecordDto): Promise<{
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
        createdAt: Date;
        doctorId: number;
        petId: number;
        notes: string | null;
        diagnosis: string;
        treatment: string;
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
        createdAt: Date;
        doctorId: number;
        petId: number;
        notes: string | null;
        diagnosis: string;
        treatment: string;
    })[]>;
    findAllByUser(userId: number): Promise<({
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
        createdAt: Date;
        doctorId: number;
        petId: number;
        notes: string | null;
        diagnosis: string;
        treatment: string;
    })[]>;
    findByPet(petId: number, userId: number, role: Role): Promise<({
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
    } & {
        id: number;
        createdAt: Date;
        doctorId: number;
        petId: number;
        notes: string | null;
        diagnosis: string;
        treatment: string;
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
        createdAt: Date;
        doctorId: number;
        petId: number;
        notes: string | null;
        diagnosis: string;
        treatment: string;
    }>;
    update(id: number, userId: number, role: Role, dto: UpdateMedicalRecordDto): Promise<{
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
        createdAt: Date;
        doctorId: number;
        petId: number;
        notes: string | null;
        diagnosis: string;
        treatment: string;
    }>;
    remove(id: number, userId: number, role: Role): Promise<{
        id: number;
        createdAt: Date;
        doctorId: number;
        petId: number;
        notes: string | null;
        diagnosis: string;
        treatment: string;
    }>;
}
