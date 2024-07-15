import prisma from "../src/utils/prisma.js";
import bcrypt from "bcrypt";

async function seedUsers() {
  await prisma.user.create({
    data: {
      username: "Jonny",
      passwordHash: await bcrypt.hash("password123", 8),
      movies: {
        create: {
          title: "Top Gun",
          description: "Fighter jets and stuff",
          runtimeMins: 89,
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      username: "AdminTest",
      passwordHash: await bcrypt.hash("password", 8),
      role: 'ADMIN'
    },
  });

  await prisma.user.create({
    data: {
      username: "Mikey",
      passwordHash: await bcrypt.hash("password321", 8),
      movies: {
        createMany: {
          data: [
            { title: "Marley And Me", description: "Labradors And Stuff", runtimeMins: 89 },
            {
              title: "28 Days Later",
              description: "Zombies and stuff",
              runtimeMins: 89,
            },
          ],
        },
      },
    },
  });
}

seedUsers();
