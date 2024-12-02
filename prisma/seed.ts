import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seedIssues() {
  const issuesToCreate = 50; // Number of issues to generate

  const users = await prisma.user.findMany({ select: { id: true } }); // Fetch existing user IDs
  const userIds = users.map((user) => user.id);

  const issueData = Array.from({ length: issuesToCreate }).map(() => ({
    title: faker.lorem.sentence(5),
    description: faker.lorem.paragraph(),
    status: faker.helpers.arrayElement(['OPEN', 'IN_PROGRESS', 'CLOSED']),
    assignedToUserId: faker.helpers.arrayElement([null, ...userIds]), // Randomly assign a user or leave unassigned
  }));

  await prisma.issue.createMany({ data: issueData }); // Seed the data
  console.log(`${issuesToCreate} issues created successfully!`);
}

async function main() {
  await seedIssues();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
