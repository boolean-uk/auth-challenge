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
    console.log("1. this is request", req.headers)
    try {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, jwtSecret)
    } catch (e) {
        return res.status(401).json({ error: 'Invalid token provided.' })
    }

    try {
        const createdMovie = await prisma.movie.create({
            data: {
                title: title,
                description: description,
                runtimeMins: runtimeMins
            }
        });
        res.status(201).json({data: createdMovie})
    } catch(e) {
        console.log(e)
        res.status(400).json({error: e.message})
    }
};

module.exports = {
    getAllMovies,
    createMovie
};