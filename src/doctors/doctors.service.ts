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

  const schedules = await this.prisma.schedule.findMany({
    where: { doctorId: doctor.id },
  });

  return { success: true, data: { schedules } };
}

async addSchedule(userId: number, body: { day: string; startTime: string; endTime: string }) {
  const doctor = await this.prisma.doctor.findUnique({ where: { userId } });
  if (!doctor) throw new NotFoundException('Profil dokter tidak ditemukan');

  const schedule = await this.prisma.schedule.create({
    data: {
      doctorId: doctor.id,
      day: body.day,
      startTime: body.startTime,
      endTime: body.endTime,
    },
  });

  return { success: true, message: 'Jadwal berhasil ditambahkan', data: schedule };
}

async removeSchedule(userId: number, scheduleId: number) {
  const doctor = await this.prisma.doctor.findUnique({ where: { userId } });
  if (!doctor) throw new NotFoundException('Profil dokter tidak ditemukan');

  const schedule = await this.prisma.schedule.findFirst({
    where: { id: scheduleId, doctorId: doctor.id },
  });
  if (!schedule) throw new NotFoundException('Jadwal tidak ditemukan');

  await this.prisma.schedule.delete({ where: { id: scheduleId } });

  return { success: true, message: 'Jadwal berhasil dihapus' };
}

async update(id: number, dto: any) {
  const doctor = await this.prisma.doctor.findUnique({ where: { id } });
  if (!doctor) throw new NotFoundException('Dokter tidak ditemukan');

  const updated = await this.prisma.doctor.update({
    where: { id },
    data: dto,
  });

  return { success: true, message: 'Data dokter berhasil diupdate', data: updated };
}

async remove(id: number) {
  const doctor = await this.prisma.doctor.findUnique({ where: { id } });
  if (!doctor) throw new NotFoundException('Dokter tidak ditemukan');

  await this.prisma.doctor.delete({ where: { id } });

  return { success: true, message: 'Dokter berhasil dihapus' };
}

}