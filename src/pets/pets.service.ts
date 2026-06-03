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
import { ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        species: { type: 'string' },
        breed: { type: 'string' },
        age: { type: 'number' },
        gender: { type: 'string' },
        weight: { type: 'number' },
        healthStatus: { type: 'string' },
        photo: { type: 'string', format: 'binary' },
      },
    },
  })
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

  @Get('all')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'DOCTOR')
  findAllAdmin() {
    return this.petsService.findAll();
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

  @Patch(':id/photo')
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        photo: { type: 'string', format: 'binary' },
      },
    },
  })
  uploadPhoto(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.petsService.updatePhoto(id, userId, file);
  }
}