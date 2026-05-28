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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let CommentsService = class CommentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, postId, dto) {
        const post = await this.prisma.post.findUnique({ where: { id: postId } });
        if (!post)
            throw new common_1.NotFoundException('Post tidak ditemukan');
        return this.prisma.comment.create({
            data: {
                content: dto.content,
                userId,
                postId,
            },
            include: {
                user: { select: { id: true, fullname: true } },
            },
        });
    }
    async findByPost(postId) {
        const post = await this.prisma.post.findUnique({ where: { id: postId } });
        if (!post)
            throw new common_1.NotFoundException('Post tidak ditemukan');
        return this.prisma.comment.findMany({
            where: { postId },
            include: {
                user: { select: { id: true, fullname: true } },
            },
            orderBy: { createdAt: 'asc' },
        });
    }
    async remove(id, userId, role) {
        const comment = await this.prisma.comment.findUnique({
            where: { id },
        });
        if (!comment)
            throw new common_1.NotFoundException('Komentar tidak ditemukan');
        const isOwner = comment.userId === userId;
        const isAdmin = role === client_1.Role.ADMIN;
        if (!isOwner && !isAdmin)
            throw new common_1.ForbiddenException('Akses ditolak');
        return this.prisma.comment.delete({ where: { id } });
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentsService);
//# sourceMappingURL=comments.service.js.map