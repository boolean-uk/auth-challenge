const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllMovies = async (req, res) => {
    const movies = await prisma.movie.findMany();

    res.json({ data: movies });
};

const createMovie = async (req, res) => {
    const { title, description, runtimeMins } = req.body;

    const createdMovie = await prisma.movie.create({
        data:{
            title:title,
            description:description,
            runtimeMins:runtimeMins
        }
    })

    res.json({ data: createdMovie });
};

module.exports = {
    getAllMovies,
    createMovie
};