const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwtSecret = "mysecret";

const getAllMovies = async (req, res) => {
	const movies = await prisma.movie.findMany();

	res.json({ data: movies });
};

const createMovie = async (req, res) => {
	const { title, description, runtimeMins } = req.body;
	let bearer = req.headers.authorization;

	if (!bearer) {
		return res
			.status(403)
			.json({ error: "Please log in before using this feature" });
	}

	bearer = bearer.replace("Bearer ", "");

	try {
		// todo verify the token
		const token = jwt.verify(bearer, jwtSecret);
	} catch (e) {
		return res.status(401).json({ error: "Invalid token provided." });
	}

	const createdMovie = await prisma.movie.create({
		data: {
			title,
			description,
			runtimeMins,
		},
	});

	res.status(201).json({ data: createdMovie });
};

module.exports = {
	getAllMovies,
	createMovie,
};
