const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwtSecret = process.env.JWT_SECRET;

const getAllUserMovies = async (req, res) => {
	const { id } = req.params;
	const movies = await prisma.movie.findMany({
		where: {
			userId: parseInt(id),
		},
	});

	res.json({ movies: movies });
};

const createMovie = async (req, res) => {
	const { title, description, runtimeMins, accessToken } = req.body;

	try {
		// TODO: Decode token
		jwt.verify(accessToken, jwtSecret);

		// Create movie
		await prisma.movie.create({
			data: {
				title: title,
				description: description,
				runtimeMins: runtimeMins,
			},
		});

		// get all the movies to return
		const allMovies = await prisma.movie.findMany();

		return res.status(201).json({ movies: allMovies });
	} catch (e) {
		return res.status(401).json({ error: 'Invalid token provided.' });
	}

	const createdMovie = null;

	res.json({ data: createdMovie });
};

module.exports = {
	getAllUserMovies,
	createMovie,
};
