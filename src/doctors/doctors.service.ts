import {
 Injectable,
 NotFoundException
} from '@nestjs/common';

import { PrismaService }
from '../prisma/prisma.service';

import { CreateDoctorDto }
from './dto/create-doctor.dto';

@Injectable()

export class DoctorsService{

 constructor(
  private prisma:PrismaService
 ){}

 async create(
 dto:CreateDoctorDto
 ){

   const user=
   await this.prisma.user.findUnique({

      where:{
        id:dto.userId
      }

   })

   if(!user){

      throw new NotFoundException({

        success:false,
        message:
        'User tidak ditemukan'

      })

   }

   const doctor=
   await this.prisma.doctor.create({

      data:dto

   })

   return{

      success:true,
      message:
      'Dokter berhasil ditambahkan',

      data:doctor

   }

 }

 async findAll(){

   const doctors=
   await this.prisma.doctor.findMany({

      select:{
        id:true,
        userId:true,
        specialization:true,
        experience:true,
        schedule:true,
        user:{
          select:{
            fullname:true,
            email:true,
          }
        }
      }

   })

   return{

     success:true,

     message:
     'Data dokter berhasil diambil',

     data:doctors

   }

 }

}