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

 async create(dto: CreateDoctorDto, file?: Express.Multer.File) {
  const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });

  if (!user) throw new NotFoundException({ success: false, message: 'User tidak ditemukan' });

  const doctor = await this.prisma.doctor.create({
    data: {
      ...dto,
      // doctor tidak punya photoUrl di schema, foto ada di user
    },
  });

  return {
    success: true,
    message: 'Dokter berhasil ditambahkan',
    data: doctor,
  };
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

async findMe(userId: number) {
  const doctor = await this.prisma.doctor.findUnique({
    where: { userId },
    include: { user: { select: { id: true, fullname: true, email: true, photoUrl: true } } },
  });

  if (!doctor) throw new NotFoundException('Profil dokter tidak ditemukan');

  return { success: true, data: doctor };
}

async getSchedule(userId: number) {
  const doctor = await this.prisma.doctor.findUnique({ where: { userId } });
  if (!doctor) throw new NotFoundException('Profil dokter tidak ditemukan');

  return { success: true, data: { schedule: doctor.schedule } };
}

async updateSchedule(userId: number, schedule: string) {
  const doctor = await this.prisma.doctor.findUnique({ where: { userId } });
  if (!doctor) throw new NotFoundException('Profil dokter tidak ditemukan');

  const updated = await this.prisma.doctor.update({
    where: { userId },
    data: { schedule },
  });

  return { success: true, message: 'Jadwal berhasil diupdate', data: { schedule: updated.schedule } };
}


}