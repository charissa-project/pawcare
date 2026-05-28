import {
 Body,
 Controller,
 Get,
 Post,
 UseGuards
} from '@nestjs/common';

import { DoctorsService }
from './doctors.service';

import { CreateDoctorDto }
from './dto/create-doctor.dto';

import { JwtGuard }
from '../auth/guards/jwt.guard';

import { RolesGuard }
from '../auth/guards/roles.guard';

import { Roles }
from '../auth/decorators/roles.decorator';

@Controller('doctors')

export class DoctorsController{

 constructor(
  private doctorService:
  DoctorsService
 ){}

 @Post()

 @UseGuards(
  JwtGuard,
  RolesGuard
 )

 @Roles('ADMIN')

 create(
 @Body()
 dto:CreateDoctorDto
 ){

   return this
   .doctorService
   .create(dto)

 }

 @Get()

 findAll(){

   return this
   .doctorService
   .findAll()

 }

}