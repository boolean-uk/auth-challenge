import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const hashedPassword = await hash('password123', 10)

    const user = await prisma.user.create({
        data: {
            name: 'Thomas Jensen',
            email: 'me@thojensen.com',
            password: hashedPassword,
        },
    })
    const movie = await prisma.movie.create({
        data: {
            cover: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg',
            title: 'Parasite',
            description:
                'A poor family see an opportunity whenever their son starts tutoring English for a wealthy family - if they can engineer it, they can each get one of the jobs within the household.',
            runtimeMins: 132,
            userId: 1,
        },
    })
    console.log({ user, movie })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
