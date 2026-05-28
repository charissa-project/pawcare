import { CommentsService } from './comments.service';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { Role } from '@prisma/client';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(postId: number, userId: number, dto: CreateCommentDto): Promise<{
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
