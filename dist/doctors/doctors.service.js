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
    async create(dto) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: dto.userId
            }
        });
        if (!user) {
            throw new common_1.NotFoundException({
                success: false,
                message: 'User tidak ditemukan'
            });
        }
        const doctor = await this.prisma.doctor.create({
            data: dto
        });
        return {
            success: true,
            message: 'Dokter berhasil ditambahkan',
            data: doctor
        };
    }
    async findAll() {
        const doctors = await this.prisma.doctor.findMany({
            select: {
                id: true,
                userId: true,
                specialization: true,
                experience: true,
                schedule: true,
                user: {
                    select: {
                        fullname: true,
                        email: true,
                    }
                }
            }
        });
        return {
            success: true,
            message: 'Data dokter berhasil diambil',
            data: doctors
        };
    }
};
exports.DoctorsService = DoctorsService;
exports.DoctorsService = DoctorsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DoctorsService);
//# sourceMappingURL=doctors.service.js.map