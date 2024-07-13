import { PrismaClient } from "@prisma/client"
import { getUserByUserNameDb } from "./user.js"

const prisma = new PrismaClient()

export const createMovieDb = async (
	title,
	description,
	runtimeMins,
	username
) => {
	const user = await getUserByUserNameDb(username)
	const newMovie = await prisma.movie.create({
		data: {
			title: title,
			description: description,
			runtimeMins: runtimeMins,
			userId: user.id
		}, 
	})
	return newMovie
}

export const getAllMoviesDb = async () => {
	const allmovies = await prisma.movie.findMany()
	return allmovies
}

export const getUserMoviesDb = async (username) => {
	const user = await getUserByUserNameDb(username)
	const userMovies = await prisma.movie.findMany({
		where: {
			userId: user.id,
		},
	})
	return userMovies
}

export const getMovieByTitleDB = async (title) => {
	const movie = await prisma.movie.findFirst({
		where: {
			title: title,
		},
	})
	return movie
}
