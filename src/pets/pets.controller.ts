import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, ParseIntPipe, UseGuards,
  UseInterceptors, UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { multerConfig } from '../common/upload.config';
import { ApiBearerAuth } from '@nestjs/swagger'; // ← tambah import

@ApiBearerAuth() // ← tambah ini

@UseGuards(JwtGuard)
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
@UseInterceptors(FileInterceptor('photo', multerConfig))
create(
  @GetUser('id') userId: number,
  @Body() dto: CreatePetDto,
  @UploadedFile() file: Express.Multer.File,
) {
  return this.petsService.create(userId, dto, file);
}

  @Get()
  findAll(@GetUser('id') userId: number) {
    return this.petsService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @GetUser('id') userId: number) {
    return this.petsService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number,
    @Body() dto: UpdatePetDto,
  ) {
    return this.petsService.update(id, userId, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @GetUser('id') userId: number) {
    return this.petsService.remove(id, userId);
  }

  // upload foto hewan
  @Patch(':id/photo')
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  uploadPhoto(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.petsService.updatePhoto(id, userId, file);
  }
}