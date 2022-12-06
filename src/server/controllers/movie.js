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
    console.log(title, description, runtimeMins)

    try {
        const token = req.get('Authorization');
        console.log(token, process.env.SECRET);
        // todo verify the token
        jwt.verify(token, process.env.SECRET)
        const createdMovie = await prisma.movie.create({
            data: {title, description, runtimeMins}
        });
        res.json({ data: createdMovie });
    } catch (e) {
        console.log(e)
        return res.status(401).json({ error: 'Invalid token provided.' })
    }


};

module.exports = {
    getAllMovies,
    createMovie
};