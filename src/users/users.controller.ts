import {
  Controller, Get, Post, Patch, Delete, Param, ParseIntPipe, Body, UseGuards, UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { multerConfig } from '../common/upload.config';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // GET ALL USERS (ADMIN)
  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  findAll() {
    return this.usersService.findAll();
  }

  // GET MY PROFILE
  @Get('me')
  @UseGuards(JwtGuard)
  getMe(@GetUser('id') userId: number) {
    return this.usersService.findMe(userId);
  }

  // UPLOAD FOTO PROFIL
  @Patch('me/photo')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  uploadPhoto(
    @GetUser('id') userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.updatePhoto(userId, file);
  }

  // ADD USER (ADMIN)
  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  // UPDATE USER (ADMIN)
  @Patch(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(id, dto);
  }

  // UPDATE ROLE (ADMIN)
  @Patch(':id/role')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBody({ schema: { type: 'object', properties: { role: { type: 'string', enum: ['ADMIN', 'DOCTOR', 'USER'] } } } })
  updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { role: string },
  ) {
    return this.usersService.updateRole(id, body.role);
  }

  // DELETE USER (ADMIN)
  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}