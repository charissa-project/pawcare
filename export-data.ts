import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const data: Record<string, any> = {};

  // Tambahkan semua model kamu di sini
  // contoh:
  data.users = await prisma.user.findMany();
  data.products = await prisma.product.findMany();
  // dst...

  fs.writeFileSync('data-backup.json', JSON.stringify(data, null, 2));
  console.log('✅ Data berhasil diexport ke data-backup.json');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());