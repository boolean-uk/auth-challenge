import express from 'express';
import { getAllMovies, createMovie } from '../controllers/movie.js';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';

const createMovie = async (req, res) => {
    const { title, description, runtimeMins } = req.body;

    try {
        // 1. Get the token from the appropriate request header
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        // 2. Verify the token using the jsonwebtoken library
        const decoded = jwt.verify(token, jwtSecret);

        // 3. Create the movie and store the result in the createdMovie variable
        const createdMovie = await prisma.movie.create({
            data: {
                title,
                description,
                runtimeMins: parseInt(runtimeMins),
                createdBy: decoded.username, // Assuming the username is stored in the token
            },
        });

        res.json({ data: createdMovie });
    } catch (error) {
        console.error('Create movie error:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token provided.' });
        }
        res.status(500).json({ error: 'Failed to create movie' });
    }
};

export {
    getAllMovies,
    createMovie
};
const router = express.Router();

router.get('/', getAllMovies);
router.post('/', createMovie);

export default router;
