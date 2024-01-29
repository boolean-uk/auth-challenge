import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';

const getAllMovies = async (req, res) => {
    const movies = await prisma.movie.findMany();

    res.json({ data: movies });
};

const createMovie = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    jwt.verify(token, jwtSecret, async (err) => {
      if (err) {
        return res.status(401).json({ message: 'Token could not be verified' });
      }

      const { title, description, runtimeMins } = req.body;
      const createdMovie = await prisma.movie.create({
        data: { title, description, runtimeMins }
      });
      res.status(201).json({ data: createdMovie });
    });
  } catch (error) {
    res.status(500).json({ message: 'Could not create movie', error: error.message });
  }
  };

  

export {
    getAllMovies,
    createMovie
};
