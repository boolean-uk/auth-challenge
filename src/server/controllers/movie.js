import jwt from 'jsonwebtoken';
const jwtSecret = 'mysecret';

import { PrismaClient } from '@prisma/client'
import createMovieDB from '../domain/movie.js'
const prisma = new PrismaClient();

const getAllMovies = async (req, res) => {
    const movies = await prisma.movie.findMany();

    res.json({ data: movies });
};

const createMovie = async (req, res) => {
    const { title, description, runtimeMins } = req.body;

    try {
        const token = req.headers.authorization
        jwt.verify(token, jwtSecret)
    } catch (e) {
        return res.status(401).json({ error: 'Invalid token provided.' })
    }

    const createdMovie = await createMovieDB(title, description, runtimeMins)
    res.status(201).json({ data: createdMovie });
};

export {
    getAllMovies,
    createMovie
};
