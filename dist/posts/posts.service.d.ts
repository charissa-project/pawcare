import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Role } from '@prisma/client';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, dto: CreatePostDto): Promise<{
        user: {
            fullname: string;
            id: number;
        };
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        content: string;
        likes: number;
    }>;
    findAll(): Promise<({
        comments: ({
            user: {
                fullname: string;
                id: number;
            };
        } & {
            id: number;
            createdAt: Date;
            userId: number;
            content: string;
            postId: number;
        })[];
        user: {
            fullname: string;
            id: number;
        };
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        content: string;
        likes: number;
    })[]>;
    findOne(id: number): Promise<{
        comments: ({
            user: {
                fullname: string;
                id: number;
            };
        } & {
            id: number;
            createdAt: Date;
            userId: number;
            content: string;
            postId: number;
        })[];
        user: {
            fullname: string;
            id: number;
        };
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        content: string;
        likes: number;
    }>;
    update(id: number, userId: number, role: Role, dto: UpdatePostDto): Promise<{
        user: {
            fullname: string;
            id: number;
        };
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        content: string;
        likes: number;
    }>;
    remove(id: number, userId: number, role: Role): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        content: string;
        likes: number;
    }>;
    like(id: number): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        content: string;
        likes: number;
    }>;
}
