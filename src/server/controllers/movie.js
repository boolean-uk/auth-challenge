import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { getAllMoviesDb } from '../domains/movie.js'
const prisma = new PrismaClient()

const jwtSecret = process.env.JWT_SECRET

async function getAllMovies(req, res) {
    const movies = await getAllMoviesDb()

    res.json({
        movies
    })
}

async function createMovie(req, res) {
}

export {
    getAllMovies,
    createMovie
};