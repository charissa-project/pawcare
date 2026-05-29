import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, ParseIntPipe, UseGuards,
  UseInterceptors, UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Role } from '@prisma/client';
import { multerConfig } from '../common/upload.config';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // buat post + opsional upload foto sekaligus
  @Post()
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  create(
    @GetUser('id') userId: number,
    @Body() dto: CreatePostDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.postsService.create(userId, dto, file);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number,
    @GetUser('role') role: Role,
    @Body() dto: UpdatePostDto,
  ) {
    return this.postsService.update(id, userId, role, dto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number,
    @GetUser('role') role: Role,
  ) {
    return this.postsService.remove(id, userId, role);
  }

  @Patch(':id/like')
  @UseGuards(JwtGuard)
  like(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.like(id);
  }
}