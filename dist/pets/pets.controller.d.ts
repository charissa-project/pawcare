import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
export declare class PetsController {
    private readonly petsService;
    constructor(petsService: PetsService);
    create(userId: number, dto: CreatePetDto, file: Express.Multer.File): Promise<{
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
    }>;
    findAll(userId: number): Promise<{
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
    }[]>;
    findAllAdmin(): Promise<({
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
    })[]>;
    findOne(id: number, userId: number): Promise<{
        medicalRecords: ({
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
            diagnosis: string;
            treatment: string;
            notes: string | null;
        })[];
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
    }>;
    update(id: number, userId: number, dto: UpdatePetDto): Promise<{
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
    }>;
    remove(id: number, userId: number): Promise<{
        success: boolean;
        message: string;
        data: {
            medicalRecords: ({
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
                diagnosis: string;
                treatment: string;
                notes: string | null;
            })[];
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
    }>;
    uploadPhoto(id: number, userId: number, file: Express.Multer.File): Promise<{
        data: {
            photoUrl: string | null;
        };
    }>;
}
