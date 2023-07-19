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
    const token = req.header('authorization')
   
    jwt.verify(token.slice(7), jwtSecret)
    

    const createdMovie = await prisma.movie.create({
        data: {
            title,
            description,
            runtimeMins
        }
    })
    res.status(201).send({createdMovie: createMovie})
};

module.exports = {
    getAllMovies,
    createMovie
};