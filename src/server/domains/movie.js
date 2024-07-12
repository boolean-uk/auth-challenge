import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createMovieDb = async (
	title,
	description,
	runtimeMins,
	userId
) => {
	const newMovie = await prisma.movie.create({
		data: {
			title: title,
			description: description,
			runtimeMins: runtimeMins,
			userId: userId
		},
	})
	return newMovie
}

export const getAllMoviesDb = async () => {
	const allmovies = await prisma.movie.findMany()
	return allmovies
}

export const getMoviesByUsernameDb = async (username) => {
	
}

export const getMovieByTitleDB = async (title) => {
    const movie = await prisma.movie.findFirst({
        where: {
            title: title
        }
    })
    return movie
}