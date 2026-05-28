import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Role } from '@prisma/client';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // buat post (butuh login)
  @Post()
  @UseGuards(JwtGuard)
  create(@GetUser('id') userId: number, @Body() dto: CreatePostDto) {
    return this.postsService.create(userId, dto);
  }

  // feed komunitas (tidak perlu login)
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

  // like post (butuh login)
  @Patch(':id/like')
  @UseGuards(JwtGuard)
  like(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.like(id);
  }
}