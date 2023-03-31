const jwt = require('jsonwebtoken');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';

const getAllMovies = async (req, res) => {
    const movies = await prisma.movie.findMany();

    res.json({ data: movies });
};

const createMovie = async (req, res) => {
    const { title, description, runtimeMins } = req.body;

    if (!title || !description || !runtimeMins) {
        return res
            .status(400)
            .json({ error: 'Missing fields in request body' });
    }

    try {
        const token = req.headers.authorization;
        const tokenToVerify = token.split(' ')[1];
        // todo verify the token
        jwt.verify(tokenToVerify, jwtSecret);
    } catch (e) {
        return res.status(401).json({ error: 'Invalid token provided.' });
    }

    try {
        const createdMovie = await prisma.movie.create({
            data: {
                title,
                description,
                runtimeMins,
            },
        });

        res.json({ data: createdMovie });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return res.status(401).json({
                    error: 'A movie with that name already exists',
                });
            }
        }
        res.status(500).json({ error: e.message });
    }
};

module.exports = {
    getAllMovies,
    createMovie,
};
