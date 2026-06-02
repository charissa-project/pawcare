import { CommentsService } from './comments.service';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { Role } from '@prisma/client';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(postId: number, userId: number, dto: CreateCommentDto): Promise<{
        user: {
            fullname: string;
            id: number;
        };
    } & {
        id: number;
        createdAt: Date;
        content: string;
        userId: number;
        postId: number;
    }>;
    findByPost(postId: number): Promise<({
        user: {
            fullname: string;
            id: number;
        };
    } & {
        id: number;
        createdAt: Date;
        content: string;
        userId: number;
        postId: number;
    })[]>;
    remove(id: number, userId: number, role: Role): Promise<{
        id: number;
        createdAt: Date;
        content: string;
        userId: number;
        postId: number;
    }>;
}
