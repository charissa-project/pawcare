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
exports.RemindersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RemindersService = class RemindersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validatePetOwnership(petId, userId) {
        const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
        if (!pet)
            throw new common_1.NotFoundException('Hewan tidak ditemukan');
        if (pet.userId !== userId)
            throw new common_1.ForbiddenException('Akses ditolak');
        return pet;
    }
    async create(userId, dto) {
        await this.validatePetOwnership(dto.petId, userId);
        return this.prisma.reminder.create({
            data: {
                ...dto,
                reminderDate: new Date(dto.reminderDate),
            },
        });
    }
    async findAllByUser(userId) {
        return this.prisma.reminder.findMany({
            where: {
                pet: { userId },
            },
            include: { pet: true },
            orderBy: { reminderDate: 'asc' },
        });
    }
    async findByPet(petId, userId) {
        await this.validatePetOwnership(petId, userId);
        return this.prisma.reminder.findMany({
            where: { petId },
            orderBy: { reminderDate: 'asc' },
        });
    }
    async update(id, userId, dto) {
        const reminder = await this.prisma.reminder.findUnique({
            where: { id },
            include: { pet: true },
        });
        if (!reminder)
            throw new common_1.NotFoundException('Reminder tidak ditemukan');
        if (reminder.pet.userId !== userId)
            throw new common_1.ForbiddenException('Akses ditolak');
        return this.prisma.reminder.update({
            where: { id },
            data: {
                ...dto,
                reminderDate: dto.reminderDate ? new Date(dto.reminderDate) : undefined,
            },
        });
    }
    async markDone(id, userId) {
        return this.update(id, userId, { isDone: true });
    }
    async remove(id, userId) {
        const reminder = await this.prisma.reminder.findUnique({
            where: { id },
            include: { pet: true },
        });
        if (!reminder)
            throw new common_1.NotFoundException('Reminder tidak ditemukan');
        if (reminder.pet.userId !== userId)
            throw new common_1.ForbiddenException('Akses ditolak');
        return this.prisma.reminder.delete({ where: { id } });
    }
};
exports.RemindersService = RemindersService;
exports.RemindersService = RemindersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RemindersService);
//# sourceMappingURL=reminders.service.js.map