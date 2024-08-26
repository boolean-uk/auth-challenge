import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const jwtSecret = 'mysecret';

export const getAllMovies = async (req, res) => {
    const movies = await prisma.movie.findMany();
    res.json({ data: movies });
};

export const createMovie = async (req, res) => {
    const { title, description, runtimeMins } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    try {
        const decoded = jwt.verify(token, jwtSecret);

        const createdMovie = await prisma.movie.create({
            data: {
                title,
                description,
                runtimeMins,
                userId: decoded.userId, // Link the movie to the authenticated user
            },
        });

        res.json({ data: createdMovie });
    } catch (e) {
        return res.status(401).json({ error: 'Invalid token provided.' });
    }
};
