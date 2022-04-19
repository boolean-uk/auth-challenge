const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwtSecret = 'mysecret'; 

const getAllMovies = async (req, res) => {
    const movies = await prisma.movie.findMany();

    res.json({ data: movies });
};

const createMovie = async (req, res) => {
    console.log('stage one:')
    const { title, description, runtimeMins } = req.body;
    const authorization = req.headers['authorization']

if (!authorization) {
    console.log('stage two:')
    res.status(401);
    res.json({ error: 'Invalid authorization'})
    return
}

    try {
        const parts = authorization.split(' ')
        const token = parts[1];
        // todo verify the token
        console.log('hello', token)
    } catch (e) {
        return res.status(401).json({ error: 'Invalid token provided.' })
    }

    const createdMovie = await prisma.movie.create({
        data: { title, description, runtimeMins }
    });

    res.json({ data: createdMovie });
};

module.exports = {
    getAllMovies,
    createMovie
};

