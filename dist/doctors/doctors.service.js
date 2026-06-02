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
exports.DoctorsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DoctorsService = class DoctorsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, file) {
        const user = await this.prisma.user.findUnique({
            where: { id: Number(dto.userId) },
        });
        if (!user)
            throw new common_1.NotFoundException('User tidak ditemukan');
        const doctor = await this.prisma.doctor.create({
            data: { ...dto },
        });
        return { success: true, message: 'Dokter berhasil ditambahkan', data: doctor };
    }
    async findAll() {
        const doctors = await this.prisma.doctor.findMany({
            select: {
                id: true,
                userId: true,
                specialization: true,
                experience: true,
                schedule: true,
                user: { select: { fullname: true, email: true } },
            },
        });
        return { success: true, message: 'Data dokter berhasil diambil', data: doctors };
    }
    async findMe(userId) {
        const doctor = await this.prisma.doctor.findFirst({
            where: { userId: Number(userId) },
            include: {
                user: { select: { id: true, fullname: true, email: true, photoUrl: true } },
            },
        });
        if (!doctor)
            throw new common_1.NotFoundException('Profil dokter tidak ditemukan');
        return { success: true, data: doctor };
    }
    async getSchedule(userId) {
        const doctor = await this.prisma.doctor.findFirst({
            where: { userId: Number(userId) },
        });
        if (!doctor)
            throw new common_1.NotFoundException('Profil dokter tidak ditemukan');
        const schedules = await this.prisma.schedule.findMany({
            where: { doctorId: doctor.id },
        });
        return { success: true, data: schedules };
    }
    async addSchedule(userId, body) {
        const doctor = await this.prisma.doctor.findFirst({
            where: { userId: Number(userId) },
        });
        if (!doctor)
            throw new common_1.NotFoundException('Profil dokter tidak ditemukan');
        const schedule = await this.prisma.schedule.create({
            data: {
                doctorId: doctor.id,
                day: body.day,
                startTime: body.startTime,
                endTime: body.endTime,
            },
        });
        return { success: true, message: 'Jadwal berhasil ditambahkan', data: schedule };
    }
    async updateSchedule(userId, scheduleId, body) {
        const doctor = await this.prisma.doctor.findFirst({
            where: { userId: Number(userId) },
        });
        if (!doctor)
            throw new common_1.NotFoundException('Profil dokter tidak ditemukan');
        const schedule = await this.prisma.schedule.findFirst({
            where: { id: Number(scheduleId), doctorId: doctor.id },
        });
        if (!schedule)
            throw new common_1.NotFoundException('Jadwal tidak ditemukan');
        const updated = await this.prisma.schedule.update({
            where: { id: Number(scheduleId) },
            data: {
                day: body.day,
                startTime: body.startTime,
                endTime: body.endTime,
            },
        });
        return { success: true, message: 'Jadwal berhasil diupdate', data: updated };
    }
    async removeSchedule(userId, scheduleId) {
        const doctor = await this.prisma.doctor.findFirst({
            where: { userId: Number(userId) },
        });
        if (!doctor)
            throw new common_1.NotFoundException('Profil dokter tidak ditemukan');
        const schedule = await this.prisma.schedule.findFirst({
            where: { id: Number(scheduleId), doctorId: doctor.id },
        });
        if (!schedule)
            throw new common_1.NotFoundException('Jadwal tidak ditemukan');
        await this.prisma.schedule.delete({ where: { id: Number(scheduleId) } });
        return { success: true, message: 'Jadwal berhasil dihapus' };
    }
    async update(id, dto) {
        const doctor = await this.prisma.doctor.findUnique({ where: { id: Number(id) } });
        if (!doctor)
            throw new common_1.NotFoundException('Dokter tidak ditemukan');
        const updated = await this.prisma.doctor.update({
            where: { id: Number(id) },
            data: dto,
        });
        return { success: true, message: 'Dokter berhasil diperbarui', data: updated };
    }
    async remove(id) {
        const doctor = await this.prisma.doctor.findUnique({ where: { id: Number(id) } });
        if (!doctor)
            throw new common_1.NotFoundException('Dokter tidak ditemukan');
        await this.prisma.doctor.delete({ where: { id: Number(id) } });
        return { success: true, message: 'Dokter berhasil dihapus' };
    }
};
exports.DoctorsService = DoctorsService;
exports.DoctorsService = DoctorsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DoctorsService);
//# sourceMappingURL=doctors.service.js.map