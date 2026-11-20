import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.tenant.findFirst();
  if (existing) {
    console.log('Base deja initialisee, seed ignore.');
    return;
  }

  const tenant = await prisma.tenant.create({
    data: { name: 'Demo', colorMain: '#6366f1', colorAccent: '#8b5cf6' },
  });

  await prisma.stage.createMany({
    data: [
      { name: 'A faire', order: 0, type: 'todo', tenantId: tenant.id },
      { name: 'En cours', order: 1, type: 'doing', tenantId: tenant.id },
      { name: 'Termine', order: 2, type: 'done', tenantId: tenant.id },
    ],
  });

  const hash = await bcrypt.hash('admin', 10);
  await prisma.user.create({
    data: {
      email: 'admin@demo.local',
      password: hash,
      firstName: 'Admin',
      lastName: 'Demo',
      role: 'admin',
      tenantId: tenant.id,
    },
  });

  console.log('Seed termine : tenant Demo + admin@demo.local / admin');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
