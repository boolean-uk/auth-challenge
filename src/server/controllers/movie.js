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

    const authorization = req.headers['authorization']
    if(!authorization) {
        res.status(401)
        res.json({error: 'token is not valid, no header'})
        return
    }

    console.log("authorization is:", authorization)
    

    const parts = authorization.split(' ')
    const token = parts[1]
    console.log("token is", token)
    try {
        // todo verify the token
        const payload = jwt.verify(token, jwtSecret)
    } catch (e) {
        console.log(e)
        return res.status(401).json({ error: 'Invalid token provided.' })
    }

    const createdMovie = await prisma.movie.create({
        data: {
            title,
            description,
            runtimeMins,
        },
    });

    res.json({ data: createdMovie });
};

module.exports = {
    getAllMovies,
    createMovie
};