import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DoctorsModule } from './doctors/doctors.module';
import { PetsModule } from './pets/pets.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { MedicalRecordsModule } from './medical-records/medical-records.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { CartModule } from './cart/cart.module';
import 'dotenv/config';

@Module({
 imports:[
   PrismaModule,
   AuthModule,
   UsersModule,
   DoctorsModule,
   PetsModule,
   AppointmentsModule,
   MedicalRecordsModule,
   ProductsModule,
   OrdersModule,
   PostsModule,
   CommentsModule,
   CartModule
 ]
})
export class AppModule {}