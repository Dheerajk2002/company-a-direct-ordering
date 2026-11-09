import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const kondapur = await prisma.outlet.upsert({
    where: { name: 'Kondapur' },
    update: {},
    create: {
      name: 'Kondapur',
      fssaiLicense: '13621011000412',
      isCloudKitchen: false,
      minPrepMinutes: 30,
    },
  });

  const gachibowli = await prisma.outlet.upsert({
    where: { name: 'Gachibowli cloud kitchen' },
    update: {},
    create: {
      name: 'Gachibowli cloud kitchen',
      fssaiLicense: '13621011000899',
      isCloudKitchen: true,
      minPrepMinutes: 25,
    },
  });

  const kukatpally = await prisma.outlet.upsert({
    where: { name: 'Kukatpally' },
    update: {},
    create: {
      name: 'Kukatpally',
      fssaiLicense: '13621011000554',
      isCloudKitchen: false,
      minPrepMinutes: 30,
    },
  });

  console.log('Seeded outlets:', { kondapur, gachibowli, kukatpally });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
