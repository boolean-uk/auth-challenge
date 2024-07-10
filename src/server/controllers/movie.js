import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { createMovieDb, getAllMoviesDb } from '../domains/movie.js'
const prisma = new PrismaClient()

const jwtSecret = process.env.JWT_SECRET

async function getAllMovies(req, res) {
    const movies = await getAllMoviesDb()

    res.json({
        data: movies
    })
}

async function createMovie(req, res) {
    const {title, description, runtimeMins} = req.body

    const createdMovie = await createMovieDb(title, description, runtimeMins)

    res.status(201).json({
        data: createdMovie
    })
}

export {
    getAllMovies,
    createMovie
};