import jwt from 'jsonwebtoken';
import { prisma } from "../../utils/prisma.js";
import { movieDB } from '../../domain/movieDb.js';

const jwtSecret = process.env.JWT_SECRET;

const getAllMovies = async (req, res) => {

    const movies = await prisma.movie.findMany();

    res.json({ data: movies });

};




const createMovie = async (req, res) => {
    const { title, description, runtimeMins } = req.body;

    try {
        const authHeader = req.headers['Authorization'];

        if (!authHeader) {
            return res.status(401).json({ error: 'Unauthorized: Missing Token' });
        }

        const token = authHeader.split(' ')[1];

        const verifyToken = async (token, secret) => {
            try {
                const result = await jwt.verify(token, secret);
                return result;
            } catch (error) {
                throw new Error('Invalid token');
            }
        };

        const tokenVerified = await verifyToken(token, jwtSecret);
        console.log(tokenVerified)

        if (tokenVerified) {
            const createdMovie = await movieDB(title, description, runtimeMins);
            res.json({ data: createdMovie });
        } else {
            return res.status(401).json({ error: 'Invalid token provided.' });
        }

    } catch (error) {
        res.status(401).json({ error: error.message || 'Invalid token provided.' });
    }
};


export {
    getAllMovies,
    createMovie
};
