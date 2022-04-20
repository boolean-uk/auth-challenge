const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getMovies = async (req, res) => {
    const movies = await prisma.movie.findMany({
        where : {
            userId: req.userId
        }
    });

    res.json({ movies: movies });
}

const createMovie = async (req, res) => {

    const { title, description, runtimeMins } = req.body;

    const createdMovie = await prisma.movie.create({
        data: {
            title,
            description,
            runtimeMins: parseInt(runtimeMins),
            userId: req.userId
        }
    });

    res.json({ message: "Movie added" });
}

module.exports = {
    getMovies,
    createMovie
}