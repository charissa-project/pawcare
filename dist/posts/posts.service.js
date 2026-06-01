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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let PostsService = class PostsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto, file) {
        const imageUrl = file ? file.path : null;
        const post = await this.prisma.post.create({
            data: {
                userId,
                content: dto.content,
                imageUrl,
            },
        });
        return {
            success: true,
            message: 'Post berhasil dibuat',
            data: post,
        };
    }
    async findAll() {
        return this.prisma.post.findMany({
            include: {
                user: { select: { id: true, fullname: true } },
                comments: {
                    include: { user: { select: { id: true, fullname: true } } },
                    orderBy: { createdAt: 'asc' },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const post = await this.prisma.post.findUnique({
            where: { id },
            include: {
                user: { select: { id: true, fullname: true } },
                comments: {
                    include: { user: { select: { id: true, fullname: true } } },
                    orderBy: { createdAt: 'asc' },
                },
            },
        });
        if (!post)
            throw new common_1.NotFoundException('Post tidak ditemukan');
        return post;
    }
    async update(id, userId, role, dto) {
        const post = await this.findOne(id);
        const isOwner = post.userId === userId;
        const isAdmin = role === client_1.Role.ADMIN;
        if (!isOwner && !isAdmin)
            throw new common_1.ForbiddenException('Akses ditolak');
        return this.prisma.post.update({
            where: { id },
            data: { content: dto.content },
            include: {
                user: { select: { id: true, fullname: true } },
            },
        });
    }
    async remove(id, userId, role) {
        const post = await this.findOne(id);
        const isOwner = post.userId === userId;
        const isAdmin = role === client_1.Role.ADMIN;
        if (!isOwner && !isAdmin)
            throw new common_1.ForbiddenException('Akses ditolak');
        return this.prisma.post.delete({ where: { id } });
    }
    async like(id) {
        const post = await this.findOne(id);
        return this.prisma.post.update({
            where: { id },
            data: { likes: post.likes + 1 },
        });
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
//# sourceMappingURL=posts.service.js.map