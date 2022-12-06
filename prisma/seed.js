const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  await createUser();
  await createMovie();
}

async function createUser() {
  const user = await prisma.user.createMany({
    data: [
      {
        username: "Patto",
        password: "123ABC",
      },
      {
        username: "mccallister",
        password: "123ABC",
      },
    ],
  });
  return user;
}

async function createMovie() {
  const movies = await prisma.movie.createMany({
    data: [
      {
        title: "The grinch",
        description: "best Xmas movie ever",
        runtimeMins: 120,
        userId: 1,
      },
      {
        title: "Troll 2",
        description: "best movie ever",
        runtimeMins: 120,
        userId: 2,
      },
    ],
  });
  return movies
}


seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
