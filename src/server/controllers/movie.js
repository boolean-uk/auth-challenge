const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';

const getAllMovies = async (req, res) => {
    const movies = await prisma.movie.findMany();

    res.json({ data: movies });
};

const createMovie = async (req, res) => {
    const { title, description, runtimeMins } = req.body;

    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, jwtSecret);
  
      if (decodedToken) {
        // Create the movie in the database
        const createdMovie = await prisma.movie.create({
          data: {
            title,
            description,
            runtimeMins,
          },
        });
  
        return res.json({ data: createdMovie });
      } else {
        return res.status(401).json({ error: 'Invalid token provided.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred during movie creation.' });
    }
  };

module.exports = {
    getAllMovies,
    createMovie
};