import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main(){
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.log('ADMIN_EMAIL or ADMIN_PASSWORD not set in env — skipping admin seed.');
    return;
  }

  const existing = await prisma.admin.findUnique({ where: { email: adminEmail } });
  if (existing) {
    console.log('Admin already exists — skipping.');
    return;
  }

  const hashed = await bcrypt.hash(adminPassword, 10);
  await prisma.admin.create({ data: { email: adminEmail, password: hashed } });
  console.log('Seeded admin:', adminEmail);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => process.exit());
