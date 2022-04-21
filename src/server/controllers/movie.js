const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const secretKey = '!vbs*dfj#bhn$ksh%vjk';
const serverError = 'Something went wrong!';

const getAllMovies = async (req, res) => {

	// TODO: insert req for authorization to get only the movies of logged user
	
	const moviesFound = await prisma.movie.findMany()
	res.status(200).json({moviesFound})
};

const addNewMovie = async (req, res) => {
	try {
		const createdMovie = await prisma.movie.create({
			data: {
				title: req.body.title,
				description: req.body.description,
				runtimeMins: parseInt(req.body.runtimeMins),
			},
		});
		res.status(200).json({ movie: createdMovie });
	} catch (e) {
		console.log(e);
		res.status(500).json(serverError);
	}
};

module.exports = { getAllMovies, addNewMovie };
