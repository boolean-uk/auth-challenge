const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';

const getAllMovies = async (req, res) => {
    const movies = await prisma.movie.findMany();

    res.json({ movies });
};

const createMovie = async (req, res) => {
    const { title, description, runtimeMins } = req.body;

    try {
        const token = req.headers.authorization;
        jwt.verify(token, jwtSecret)

    } catch (error) {
        return res.status(401).json({ error: 'Invalid token provided.' })
    }

    const movie = await prisma.movie.create({
        data: {
            title,
            description,
            runtimeMins
        }
    });

    res.json({ movie });
};

module.exports = {
    getAllMovies,
    createMovie
};