import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';

const getAllMovies = async (req, res) => {
    
    const movies = await prisma.movie.findMany();

    res.json({ data: movies });
};

const createMovie = async (req, res) => {
    const { title, description, runtimeMins } = req.body;

    try {
        // Extract the token from the request header
        const token = req.headers.authorization.split(' ')[1];
    
        if (!token) {
          return res.status(401).json({ error: 'Token not provided.' });
        }
    
        // Verify the token
        const decoded = jwt.verify(token, jwtSecret);
    
        // Create the movie if the token is valid
        const createdMovie = await prisma.movie.create({
          data: {
            title,
            description,
            runtimeMins,
          },
        });
    
        res.json({ data: createdMovie });
      } catch (e) {
        console.error('Error creating movie:', e);
        return res.status(401).json({ error: 'Invalid token provided.' });
      }
    };

export {
    getAllMovies,
    createMovie
};




