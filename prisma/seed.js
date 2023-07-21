const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    const createdMovies = await prisma.movie.createMany({
        data: [
          {
            title: 'Tron',
            description: 'Science Fiction',
            runtimeMins: 96,
          },
          {
            title: 'Tron: Legacy',
            description: 'Science Fiction',
            runtimeMins: 126,
          },
          {
            title: 'Titanic',
            description: 'Romance, Drama',
            runtimeMins: 195,
          },
          {
            title: 'Beauty and the Beast',
            description: 'Animation, Fantasy, Romance',
            runtimeMins: 129,
          },
        ],
      });
    
    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })
