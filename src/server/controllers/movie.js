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
    let userId
    try {
        const payload = jwt.verify(token, jwtSecret)
        userId = payload.userId
        console.log(payload)
        const movies = await prisma.movie.findMany({ where: { userId: parseInt(userId)}});
        res.json({ data: movies });
    } catch (e) {
        console.error(e)
        res.status(401)
        res.json({ error: 'Invalid token'})
        return
    }
    console.log(userId)
    

    
};

const createMovie = async (req, res) => {
    let userId
    const { title, description, runtimeMins } = req.body;
    const authorization = req.headers.authorization
    if(!authorization) {
        res.status(401)
        res.json({ error: "Incorrect login credentials supplied"})
    }
    try {
        const token = authorization.split(" ")[1];
        const payload = jwt.verify(token, jwtSecret)
        userId = payload.userId
    } catch (e) {
        return res.status(401).json({ error: 'Invalid token provided.' })
    }

    const createdMovie = await prisma.movie.create({
        data: {
            userId: userId,
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