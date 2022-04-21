const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwtSecret = 'secret';

const getAllMovies = async (req, res) => {
    const movies = await prisma.movie.findMany();

    res.json({ data: movies });
};

const createMovie = async (req, res) => {
    const { title, description, runtimeMins } = req.body;

    try {
        console.log(req.headers)
        const token = await jwt.verify(req.headers.authorization, jwtSecret);
        // todo verify the token
    } catch (e) {
        return res.status(401).json({ error: 'Invalid token provided.' })
    }

    const createdMovie = await prisma.movie.create({
        data: {
            title: title,
            description: description,
            runtimeMins: Number(runtimeMins)
        }
    });

    res.json({ data: createdMovie });
};

module.exports = {
    getAllMovies,
    createMovie
};