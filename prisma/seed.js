const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seed() {
  await createMovies()

  process.exit(0)
}

async function createMovies() {
  const rawMovies = [
    {
      title: 'The Matrix',
      description:
        'It is the first installment in the Matrix film series, starring Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving, and Joe Pantoliano, and depicts a dystopian future in which humanity is unknowingly trapped inside the Matrix, a simulated reality that intelligent machines have created to distract humans',
      runtimeMins: 120
    },
    {
      title: 'The Flash',
      description:
        'The most famous of these is the Flash, also known as the Fastest Man Alive. Ever since the days of World War II, there has been a man clad in red who can run at impossible speeds, using his power to save lives and defend those who cannot defend themselves. All between the ticks of a second.',
      runtimeMins: 144
    },
    {
      title: 'Despicable me',
      description:
        'The Minions are small, yellow, capsule shaped creatures, who have one or two eyes. They are the signature characters of the Despicable Me series, as well as the official mascots for Illumination. They bring much of the comedy in the film, and they are known as the scene-stealer of the movie.',
      runtimeMins: 95
    },
    {
      title: 'Avatar',
      description:
        ' A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
      runtimeMins: 162
    }
  ]

  const movies = []

  for (const rawMovie of rawMovies) {
    const movie = await prisma.movie.create({ data: rawMovie })
    movies.push(movie)
  }

  console.log('Movies created', movies)

  return movies
}

seed()
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
  .finally(() => process.exit(1))
