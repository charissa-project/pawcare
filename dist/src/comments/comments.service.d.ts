import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Role } from '@prisma/client';
export declare class CommentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, postId: number, dto: CreateCommentDto): Promise<{
        user: {
            id: number;
            fullname: string;
        };
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        content: string;
        postId: number;
    }>;
    findByPost(postId: number): Promise<({
        user: {
            id: number;
            fullname: string;
        };
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        content: string;
        postId: number;
    })[]>;
    remove(id: number, userId: number, role: Role): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        content: string;
        postId: number;
    }>;
}
