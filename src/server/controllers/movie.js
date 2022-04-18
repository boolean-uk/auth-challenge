const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const secretKey = '!vbs*dfj#bhn$ksh%vjk';
const serverError = 'Something went wrong!';

const getAllMovies = async (req, res) => {
	const moviesFound = await prisma.movie.findMany();
};

const addNewMovie = async (req, res) => {
	try {
		const createdMovie = await prisma.movie.create({
			data: {
				title: req.body.title,
				description: req.body.description,
				runtimeMins: req.body.runtimeMins,
			},
		});
		res.status(200).json({ createdMovie });
	} catch (err) {
		console.log(err);
		res.status(500).json(serverError);
	}
};

module.exports = { getAllMovies, addNewMovie };
