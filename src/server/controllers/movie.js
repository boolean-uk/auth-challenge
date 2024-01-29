import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const jwtSecret = 'mysecret';

const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany();
  res.json({ data: movies });
};

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;

  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, jwtSecret);

    const createdMovie = await prisma.movie.create({
      data: {
        title,
        description,
        runtimeMins,
        userId: decodedToken.userId,
      },
    });

    res.json({ data: createdMovie });
  } catch (error) {
    console.error('An error occurred during movie creation:', error);
    return res.status(401).json({ error: 'Invalid token provided.' });
  }
};

export { getAllMovies, createMovie };
