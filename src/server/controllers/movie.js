import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';

const getAllMovies = async (req, res) => {
    const movies = await prisma.movie.findMany();

    res.json({ data: movies });
};

const createMovie = async (req, res) => {
    console.log('creating movie')
    const { title, description, runtimeMins } = req.body;

    try {
        const token = req.headers.authorization;
        const user = jwt.verify(token, jwtSecret);
        if (user) {
            const createdMovie = await prisma.movie.create({
                data: {
                    title,
                    description,
                    runtimeMins
                }
            });

            return res.json({ data: createdMovie });
        }
    } catch (e) {
        return res.status(401).json({ error: 'Invalid token provided.' })
    }

    const createdMovie = null;

    res.json({ data: createdMovie });
    console.log('Movie Created: ', createdMovie);
};

export {
    getAllMovies,
    createMovie
};
