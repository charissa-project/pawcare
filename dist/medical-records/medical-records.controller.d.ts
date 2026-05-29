import { MedicalRecordsService } from './medical-records.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { Role } from '@prisma/client';
export declare class MedicalRecordsController {
    private readonly medicalRecordsService;
    constructor(medicalRecordsService: MedicalRecordsService);
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
        petId: number;
        doctorId: number;
        diagnosis: string;
        treatment: string;
        notes: string | null;
    }>;
    findAll(userId: number): Promise<({
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
        petId: number;
        doctorId: number;
        diagnosis: string;
        treatment: string;
        notes: string | null;
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
            id: number;
            userId: number;
            specialization: string;
            experience: number;
            schedule: string;
            rating: number | null;
            isAvailable: boolean;
        };
    } & {
        id: number;
        createdAt: Date;
        petId: number;
        doctorId: number;
        diagnosis: string;
        treatment: string;
        notes: string | null;
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
        petId: number;
        doctorId: number;
        diagnosis: string;
        treatment: string;
        notes: string | null;
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
        petId: number;
        doctorId: number;
        diagnosis: string;
        treatment: string;
        notes: string | null;
    }>;
    remove(id: number, userId: number, role: Role): Promise<{
        id: number;
        createdAt: Date;
        petId: number;
        doctorId: number;
        diagnosis: string;
        treatment: string;
        notes: string | null;
    }>;
}
