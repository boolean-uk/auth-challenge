const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';

const getAllMovies = async (req, res) => {
    const authorization = req.headers.authorization
    if (!authorization) {
        res.status(401)
        res.json({ error: 'Invalid authorization'})
        return
    }
    const token = authorization.split(" ")[1];
    try {
        const payload = jwt.verify(token, jwtSecret)
        req.userId = payload.userId
    } catch (e) {
        res.status(401)
        res.json({ error: 'Invalid token'})
        return
    }
    const movies = await prisma.movie.findMany({ where: { userId: parseInt(req.userId)}});

    res.json({ data: movies });
};

const createMovie = async (req, res) => {
    const { title, description, runtimeMins } = req.body;
    const authorization = req.headers.authorization
    if(!authorization) {
        res.status(401)
        res.json({ error: "Incorrect login credentials supplied"})
    }
    try {
        const token = authorization.split(" ")[1];
        jwt.verify(token, jwtSecret)
    } catch (e) {
        return res.status(401).json({ error: 'Invalid token provided.' })
    }

    const createdMovie = await prisma.movie.create({
        data: {
            title: title, 
            description: description, 
            runtimeMins: runtimeMins
        }
        });

    res.json({ data: createdMovie });
};

module.exports = {
    getAllMovies,
    createMovie
};