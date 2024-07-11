import { PrismaClient } from '@prisma/client'
import { AccountCredentials, MovieDetails } from '../lib/definitions'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function seedUsers() {
    const newUserArr: AccountCredentials[] = [
        { username: 'user1', password: 'password1' },
        { username: 'user2', password: 'password2' },
        { username: 'user3', password: 'password3' },
        { username: 'user4', password: 'password4' },
        { username: 'user5', password: 'password5' },
    ]

    for (const user of newUserArr) {
        await prisma.user.create({
            data: {
                username: user.username,
                passwordHash: await bcrypt.hash(user.password, 8),
            },
        })
        console.log(user.username + ' created')
    }
}

async function seedMovies() {
    const newMovieArr: MovieDetails[] = [
        {
            title: 'movie1',
            description:
                'An intriguing journey of discovery and self-realization, packed with unexpected twists.',
            runtimeMins: 125,
        },
        {
            title: 'movie2',
            description:
                'A heartwarming tale of friendship and perseverance set in a small rural town.',
            runtimeMins: 110,
        },
        {
            title: 'movie3',
            description:
                'A thrilling adventure through uncharted territories, where danger lurks at every corner.',
            runtimeMins: 140,
        },
        {
            title: 'movie4',
            description:
                'A romantic comedy that explores the complexities of modern relationships with humor and charm.',
            runtimeMins: 95,
        },
        {
            title: 'movie5',
            description:
                'An epic saga of betrayal and revenge, spanning generations and continents.',
            runtimeMins: 160,
        },
    ]

    for(const movie of newMovieArr) {
        await prisma.movie.create({
            data:movie
        })
        console.log(movie.title + " created")
    }  
}

async function main() {
    await seedUsers()
    await seedMovies()
}

main()
