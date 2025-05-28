import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const newUser = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: 'password123',
  };
  const hashedPassword = await bcrypt.hash(newUser.password, 10); // Hash password with 10 salt rounds
  await prisma.user.upsert({
    where: { email: newUser.email }, // Check if user exists by username
    update: {}, // No updates if exists (optional: update fields if needed)
    create: {
      email: newUser.email,
      password: hashedPassword,
      name: newUser.name,
      document: faker.string.alphanumeric(11), // Generate a random document
    },
  });
  console.log('User seeded successfully');
}

main()
  .catch((e) => {
    console.error('Error seeding user:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
