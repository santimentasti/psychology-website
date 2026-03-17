import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample services
  const individualTherapy = await prisma.service.upsert({
    where: { id: 'service-individual' },
    update: {},
    create: {
      id: 'service-individual',
      name: 'Terapia Individual',
      description: 'Sesiones de terapia individual personalizadas',
      duration: 50,
      priceUSD: 8000, // $80.00
      priceEUR: 7000, // €70.00
      priceARS: 80000, // $800.00 ARS
      priceMXN: 1400, // $1400.00 MXN
      isActive: true,
    },
  });

  const coupleTherapy = await prisma.service.upsert({
    where: { id: 'service-couple' },
    update: {},
    create: {
      id: 'service-couple',
      name: 'Terapia de Pareja',
      description: 'Sesiones de terapia para parejas',
      duration: 60,
      priceUSD: 10000, // $100.00
      priceEUR: 9000, // €90.00
      priceARS: 100000, // $1000.00 ARS
      priceMXN: 1800, // $1800.00 MXN
      isActive: true,
    },
  });

  // Create available slots
  const slots = [
    { dayOfWeek: 1, startTime: '09:00', endTime: '10:00' }, // Monday
    { dayOfWeek: 1, startTime: '10:00', endTime: '11:00' },
    { dayOfWeek: 1, startTime: '14:00', endTime: '15:00' },
    { dayOfWeek: 2, startTime: '09:00', endTime: '10:00' }, // Tuesday
    { dayOfWeek: 2, startTime: '10:00', endTime: '11:00' },
    { dayOfWeek: 3, startTime: '09:00', endTime: '10:00' }, // Wednesday
    { dayOfWeek: 3, startTime: '14:00', endTime: '15:00' },
    { dayOfWeek: 4, startTime: '09:00', endTime: '10:00' }, // Thursday
    { dayOfWeek: 4, startTime: '10:00', endTime: '11:00' },
    { dayOfWeek: 5, startTime: '09:00', endTime: '10:00' }, // Friday
  ];

  for (const slot of slots) {
    await prisma.availableSlot.upsert({
      where: {
        id: `slot-${slot.dayOfWeek}-${slot.startTime}`,
      },
      update: {},
      create: {
        id: `slot-${slot.dayOfWeek}-${slot.startTime}`,
        ...slot,
        isActive: true,
      },
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log(`   - Created ${2} services`);
  console.log(`   - Created ${slots.length} available slots`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

