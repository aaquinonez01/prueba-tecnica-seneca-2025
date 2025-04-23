import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const hashedPassword = await bcrypt.hash("defaultpassword", 10);

  const defaultUser = await prisma.user.upsert({
    where: { email: "defaultuser@example.com" },
    update: {},
    create: {
      firstName: "Default",
      lastName: "User",
      email: "defaultuser@example.com",
      password: hashedPassword,
      isActive: true,
    },
  });

  console.log("Default user created:", defaultUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
