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
exports.PetsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const common_2 = require("@nestjs/common");
let PetsService = class PetsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        return this.prisma.pet.create({
            data: {
                ...dto,
                lastVaccine: dto.lastVaccine ? new Date(dto.lastVaccine) : null,
                nextVaccine: dto.nextVaccine ? new Date(dto.nextVaccine) : null,
                userId,
            },
        });
    }
    async findAllByUser(userId) {
        return this.prisma.pet.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, userId) {
        const pet = await this.prisma.pet.findUnique({
            where: { id },
            include: {
                reminders: true,
                medicalRecords: {
                    include: { doctor: { include: { user: true } } },
                    orderBy: { createdAt: 'desc' },
                },
            },
        });
        if (!pet)
            throw new common_1.NotFoundException('Hewan tidak ditemukan');
        if (pet.userId !== userId)
            throw new common_1.ForbiddenException('Akses ditolak');
        return pet;
    }
    async update(id, userId, dto) {
        await this.findOne(id, userId);
        return this.prisma.pet.update({
            where: { id },
            data: {
                ...dto,
                lastVaccine: dto.lastVaccine ? new Date(dto.lastVaccine) : undefined,
                nextVaccine: dto.nextVaccine ? new Date(dto.nextVaccine) : undefined,
            },
        });
    }
    async remove(id, userId) {
        const pet = await this.findOne(id, userId);
        await this.prisma.pet.delete({
            where: { id },
        });
        return {
            success: true,
            message: 'Data pet berhasil dihapus',
            data: pet,
        };
    }
    async updatePhoto(id, userId, file) {
        if (!file)
            throw new common_2.BadRequestException('File tidak ditemukan');
        const photoUrl = `/uploads/${file.filename}`;
        const updated = await this.prisma.pet.update({
            where: { id },
            data: { photoUrl },
        });
        return { data: { photoUrl: updated.photoUrl } };
    }
};
exports.PetsService = PetsService;
exports.PetsService = PetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PetsService);
//# sourceMappingURL=pets.service.js.map