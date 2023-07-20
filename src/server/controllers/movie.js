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
      jwt.verify(token, jwtSecret, async (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ error: 'Invalid token provided.' });
        }
  
        const createdMovie = await prisma.movie.create({
          data: {
            title: title,
            description: description,
            runtimeMins: runtimeMins
          }
        });
  
        res.json({ data: createdMovie });
      });
    } catch (error) {
      console.error('Error during movie creation:', error);
      return res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  };

module.exports = {
    getAllMovies,
    createMovie,
};