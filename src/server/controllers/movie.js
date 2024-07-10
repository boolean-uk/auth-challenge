import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const jwtSecret = process.env.JWT_SECRET

async function getAllMovies(req, res) {
}

async function createMovie(req, res) {
}

export {
    getAllMovies,
    createMovie
};