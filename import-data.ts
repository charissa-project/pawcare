import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as fs from 'fs';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const data = JSON.parse(fs.readFileSync('data-backup.json', 'utf-8'));

  // 1. User (tidak ada dependency)
  for (const user of data.users ?? []) {
    await prisma.user.upsert({ where: { id: user.id }, update: {}, create: user });
  }
  console.log('✅ Users imported');

  // 2. Doctor (butuh User)
  for (const doctor of data.doctors ?? []) {
    await prisma.doctor.upsert({ where: { id: doctor.id }, update: {}, create: doctor });
  }
  console.log('✅ Doctors imported');

  // 3. Pet (butuh User)
  for (const pet of data.pets ?? []) {
    await prisma.pet.upsert({ where: { id: pet.id }, update: {}, create: {
      ...pet,
      lastVaccine: pet.lastVaccine ? new Date(pet.lastVaccine) : null,
      nextVaccine: pet.nextVaccine ? new Date(pet.nextVaccine) : null,
    }});
  }
  console.log('✅ Pets imported');

  // 4. Product (tidak ada dependency)
  for (const product of data.products ?? []) {
    await prisma.product.upsert({ where: { id: product.id }, update: {}, create: product });
  }
  console.log('✅ Products imported');

  // 5. Appointment (butuh Pet & Doctor)
  for (const appointment of data.appointments ?? []) {
    await prisma.appointment.upsert({ where: { id: appointment.id }, update: {}, create: {
      ...appointment,
      appointmentDate: new Date(appointment.appointmentDate),
    }});
  }
  console.log('✅ Appointments imported');

  // 6. MedicalRecord (butuh Pet & Doctor)
  for (const record of data.medicalRecords ?? []) {
    await prisma.medicalRecord.upsert({ where: { id: record.id }, update: {}, create: record });
  }
  console.log('✅ Medical Records imported');

  // 10. Post (butuh User)
  for (const post of data.posts ?? []) {
    await prisma.post.upsert({ where: { id: post.id }, update: {}, create: post });
  }
  console.log('✅ Posts imported');

  // 11. Comment (butuh Post & User)
  for (const comment of data.comments ?? []) {
    await prisma.comment.upsert({ where: { id: comment.id }, update: {}, create: comment });
  }
  console.log('✅ Comments imported');

  console.log('\n🎉 Semua data berhasil diimport!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());