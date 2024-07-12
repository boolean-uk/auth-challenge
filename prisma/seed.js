import bcrypt from "bcrypt";
import prisma from "../src/server/utils/prisma.js";

async function main() {
  const admin = await prisma.user.create({
    data: {
      username: "Leo",
      password: await bcrypt.hash("123", 8),
      role: "ADMIN",
      movies: {
        create: {
          title: "The incredible movie",
          description: "You gotta see it, it's incredible",
          runtime: 90,
        },
      },
    },
    include: {
      movies: true,
    },
  });

  console.log("Admin created", admin);

  await user();

  return admin;
}

const user = async () =>
  await prisma.user.create({
    data: {
      username: "Lodi",
      password: await bcrypt.hash("123", 8),
    },
    include: {
      movies: true,
    },
  });

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
