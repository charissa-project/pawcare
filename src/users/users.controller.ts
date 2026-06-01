import {
  Controller, Get, Patch,
  UseGuards, UseInterceptors,
  UploadedFile, Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { multerConfig } from '../common/upload.config';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
@UseGuards(JwtGuard)
getMe(@GetUser('id') userId: number) {
  return this.usersService.findMe(userId);
}

  // upload foto profil user
  @Patch('me/photo')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  uploadPhoto(
    @GetUser('id') userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.updatePhoto(userId, file);
  }
}