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
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const common_2 = require("@nestjs/common");
let AppointmentsService = class AppointmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto, file) {
        const pet = await this.prisma.pet.findUnique({ where: { id: dto.petId } });
        if (!pet)
            throw new common_1.NotFoundException('Hewan tidak ditemukan');
        if (pet.userId !== userId)
            throw new common_1.ForbiddenException('Akses ditolak');
        const doctor = await this.prisma.doctor.findUnique({ where: { id: dto.doctorId } });
        if (!doctor)
            throw new common_1.NotFoundException('Dokter tidak ditemukan');
        const photoUrl = file ? `/uploads/${file.filename}` : null;
        return this.prisma.appointment.create({
            data: {
                petId: dto.petId,
                doctorId: dto.doctorId,
                appointmentDate: new Date(dto.appointmentDate),
                type: dto.type,
                consultationFee: dto.consultationFee,
                photoUrl,
            },
            include: {
                pet: true,
                doctor: { include: { user: true } },
            },
        });
    }
    async findAll() {
        return this.prisma.appointment.findMany({
            include: {
                pet: { include: { owner: true } },
                doctor: { include: { user: true } },
            },
            orderBy: { appointmentDate: 'desc' },
        });
    }
    async findAllByUser(userId) {
        return this.prisma.appointment.findMany({
            where: {
                pet: { userId },
            },
            include: {
                pet: true,
                doctor: { include: { user: true } },
            },
            orderBy: { appointmentDate: 'desc' },
        });
    }
    async findAllByDoctor(userId) {
        const doctor = await this.prisma.doctor.findUnique({ where: { userId } });
        if (!doctor)
            throw new common_1.NotFoundException('Profil dokter tidak ditemukan');
        return this.prisma.appointment.findMany({
            where: { doctorId: doctor.id },
            include: {
                pet: { include: { owner: true } },
                doctor: { include: { user: true } },
            },
            orderBy: { appointmentDate: 'desc' },
        });
    }
    async findOne(id, userId, role) {
        const appointment = await this.prisma.appointment.findUnique({
            where: { id },
            include: {
                pet: { include: { owner: true } },
                doctor: { include: { user: true } },
            },
        });
        if (!appointment)
            throw new common_1.NotFoundException('Appointment tidak ditemukan');
        const isOwner = appointment.pet.userId === userId;
        const isDoctor = appointment.doctor.userId === userId;
        const isAdmin = role === client_1.Role.ADMIN;
        if (!isOwner && !isDoctor && !isAdmin)
            throw new common_1.ForbiddenException('Akses ditolak');
        return appointment;
    }
    async updateStatus(id, userId, role, dto) {
        const appointment = await this.findOne(id, userId, role);
        const isDoctor = appointment.doctor.userId === userId;
        const isAdmin = role === client_1.Role.ADMIN;
        if (!isDoctor && !isAdmin)
            throw new common_1.ForbiddenException('Hanya dokter atau admin yang bisa update status');
        return this.prisma.appointment.update({
            where: { id },
            data: {
                appointmentDate: dto.appointmentDate
                    ? new Date(dto.appointmentDate)
                    : undefined,
                status: dto.status
                    ? dto.status
                    : undefined,
            },
        });
    }
    async cancel(id, userId) {
        const appointment = await this.prisma.appointment.findUnique({
            where: { id },
            include: { pet: true },
        });
        if (!appointment)
            throw new common_1.NotFoundException('Appointment tidak ditemukan');
        if (appointment.pet.userId !== userId)
            throw new common_1.ForbiddenException('Akses ditolak');
        if (appointment.status === 'COMPLETED')
            throw new common_1.ForbiddenException('Appointment sudah selesai');
        return this.prisma.appointment.update({
            where: { id },
            data: { status: 'CANCELLED' },
        });
    }
    async updatePhoto(id, userId, file) {
        if (!file)
            throw new common_2.BadRequestException('File tidak ditemukan');
        const appointment = await this.prisma.appointment.findFirst({
            where: {
                id,
                pet: { userId },
            },
        });
        if (!appointment)
            throw new common_1.NotFoundException('Appointment tidak ditemukan');
        const photoUrl = `/uploads/${file.filename}`;
        const updated = await this.prisma.appointment.update({
            where: { id },
            data: { photoUrl },
        });
        return {
            success: true,
            message: 'Foto gejala berhasil diupload',
            data: { photoUrl: updated.photoUrl },
        };
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map