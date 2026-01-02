import "dotenv/config";
import prisma from "../src/prisma.js";
import bcrypt from "bcrypt";

async function main() {
  const hashed = await bcrypt.hash("password123", 10);

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@test.com",
      password: hashed,
      role: "ADMIN",
    },
  });

  console.log("✅ User seeded");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
