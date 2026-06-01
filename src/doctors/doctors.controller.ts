import { Body, Controller, Get, Post, UseGuards, UseInterceptors, UploadedFile, Delete, Patch, Param, ParseIntPipe, } from '@nestjs/common';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../common/upload.config';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(private doctorService: DoctorsService) {}

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  create(
    @Body() dto: CreateDoctorDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.doctorService.create(dto, file);
  }

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get('me')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('DOCTOR')
  getMe(@GetUser('id') userId: number) {
    return this.doctorService.findMe(userId);
  }

  @Get('me/schedule')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('DOCTOR')
  getSchedule(@GetUser('id') userId: number) {
    return this.doctorService.getSchedule(userId);
  }

  @Post('me/schedule')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('DOCTOR')
  updateSchedule(
    @GetUser('id') userId: number,
    @Body() body: { schedule: string },
  ) {
    return this.doctorService.updateSchedule(userId, body.schedule);
  }

  @Patch(':id')
@UseGuards(JwtGuard, RolesGuard)
@Roles('ADMIN')
update(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: any,
) {
  return this.doctorService.update(id, dto);
}

@Delete(':id')
@UseGuards(JwtGuard, RolesGuard)
@Roles('ADMIN')
remove(@Param('id', ParseIntPipe) id: number) {
  return this.doctorService.remove(id);
}
}