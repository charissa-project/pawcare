"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalRecordsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let MedicalRecordsService = class MedicalRecordsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        const doctor = await this.prisma.doctor.findUnique({
            where: { userId },
        });
        if (!doctor) {
            throw new common_1.NotFoundException('Profil dokter tidak ditemukan');
        }
        const pet = await this.prisma.pet.findUnique({
            where: { id: dto.petId },
        });
        if (!pet) {
            throw new common_1.NotFoundException('Hewan tidak ditemukan');
        }
        return this.prisma.medicalRecord.create({
            data: {
                ...dto,
                doctorId: doctor.id,
            },
            include: {
                pet: true,
                doctor: { include: { user: true } },
            },
        });
    }
    async findAll() {
        return this.prisma.medicalRecord.findMany({
            include: {
                pet: { include: { owner: true } },
                doctor: { include: { user: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findAllByUser(userId) {
        return this.prisma.medicalRecord.findMany({
            where: {
                pet: { userId },
            },
            include: {
                pet: true,
                doctor: { include: { user: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findByPet(petId, userId, role) {
        const pet = await this.prisma.pet.findUnique({
            where: { id: petId },
        });
        if (!pet) {
            throw new common_1.NotFoundException('Hewan tidak ditemukan');
        }
        if (role === client_1.Role.USER && pet.userId !== userId) {
            throw new common_1.ForbiddenException('Akses ditolak');
        }
        return this.prisma.medicalRecord.findMany({
            where: { petId },
            include: {
                doctor: { include: { user: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, userId, role) {
        const record = await this.prisma.medicalRecord.findUnique({
            where: { id },
            include: {
                pet: { include: { owner: true } },
                doctor: { include: { user: true } },
            },
        });
        if (!record) {
            throw new common_1.NotFoundException('Rekam medis tidak ditemukan');
        }
        const isOwner = record.pet.userId === userId;
        const isDoctor = role === client_1.Role.DOCTOR;
        const isAdmin = role === client_1.Role.ADMIN;
        if (!isOwner && !isDoctor && !isAdmin) {
            throw new common_1.ForbiddenException('Akses ditolak');
        }
        return record;
    }
    async update(id, userId, role, dto) {
        const record = await this.findOne(id, userId, role);
        const isDoctor = role === client_1.Role.DOCTOR;
        const isAdmin = role === client_1.Role.ADMIN;
        if (!isDoctor && !isAdmin) {
            throw new common_1.ForbiddenException('Hanya dokter atau admin yang bisa mengubah rekam medis');
        }
        return this.prisma.medicalRecord.update({
            where: { id },
            data: dto,
            include: {
                pet: true,
                doctor: { include: { user: true } },
            },
        });
    }
    async remove(id, userId, role) {
        await this.findOne(id, userId, role);
        const isDoctor = role === client_1.Role.DOCTOR;
        const isAdmin = role === client_1.Role.ADMIN;
        if (!isDoctor && !isAdmin) {
            throw new common_1.ForbiddenException('Hanya dokter atau admin yang bisa menghapus rekam medis');
        }
        return this.prisma.medicalRecord.delete({
            where: { id },
        });
    }
};
exports.MedicalRecordsService = MedicalRecordsService;
exports.MedicalRecordsService = MedicalRecordsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MedicalRecordsService);
//# sourceMappingURL=medical-records.service.js.map