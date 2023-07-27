const { Prisma } = require('@prisma/client')
const prisma = require('../utils/prisma')
// const jwt = require('jsonwebtoken')

const getMovies = async (req, res) => {
	const movies = await prisma.movie.findMany({
		orderBy: {
			id: 'asc',
		},
	})
	return res.status(200).json({ movies: movies })
}

const createMovie = async (req, res) => {
	const { title, description, runtimeMins } = req.body

	if (!title || !description || !runtimeMins) {
		return res.status(400).json({
			error: 'Missing fields in request body',
		})
	}
	try {
		const createdMovie = await prisma.movie.create({
			data: {
				title,
				description,
				runtimeMins,
			},
		})
		res.status(200).json({ movie: createdMovie })
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2002') {
				return res.status(409).json({ error: 'Unique constraint failed' })
			}
		}
	}
}

module.exports = {
	getMovies,
	createMovie,
}
