const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secret = "jwtSecret"

const getMovies = async (req, res) => {
    const movies = await prisma.movie.findMany();
    res.json({ movies: movies });
}

const createMovie = async (req, res) => {

      const test = jwt.verify(req.headers.authorization.slice(7),  secret)
      
      if(!test) {
          console.log("User not logged in properly")
          return
      }

    const { title, description, runtimeMins } = req.body;

    const createdMovie = await prisma.movie.create({
        data: {
            title,
            description,
            runtimeMins: parseInt(runtimeMins)
        }
    });

    res.json({ message: "Movie added" });
}

module.exports = {
    getMovies,
    createMovie
}