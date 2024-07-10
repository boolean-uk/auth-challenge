import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createMovieDb = async (
	title,
	description,
	runtimeMins
) => {
	const newMovie = await prisma.movie.create({
		data: {
			title: title,
			description: description,
			runtimeMins: runtimeMins,
		},
	})
	return newMovie
}

export const getAllMoviesDb = async () => {
	const allmovies = await prisma.movie.findMany()
	return allmovies
}

export const getMovieByTitleDB = async (title) => {
    const movie = await prisma.movie.findFirst({
        where: {
            title: title
        }
    })
    return movie
}