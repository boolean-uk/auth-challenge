const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../../utils/prisma.js')
const secret = process.env.JWT_SECRET
const createMovie = async (req, res) => {
    const token = req.header('authorization')
    try {
        jwt.verify(token.slice(7), secret)
    } catch (e) {
        throw new Error("Incorrect token")
    }
    const {title, description, runtimeMins} = req.body
    const newMovie = await prisma.movie.create({
        data: {
            title,
            description,
            runtimeMins
        }
    })
    res.status(201).send({createdMovie: newMovie})
}

const getAllMovies = async (req, res) => {
    const allMovies = await prisma.movie.findMany()
    res.send({allMovies})
}

module.exports = {
    createMovie,
    getAllMovies
}