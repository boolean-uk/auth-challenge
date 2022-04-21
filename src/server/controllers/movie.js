const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllMovies = async (req, res) => {
    const userId = parseInt(req.userId)
    const movies = await prisma.movie.findMany({
        where: {
            userId: userId
        }
    });

    res.json({ data: movies });
};

const createMovie = async (req, res) => {
    const { title, description, runtimeMins } = req.body;
    const userId = parseInt(req.userId)
    const createdMovie = await prisma.movie.create({
        data: {
            title: title,
            description: description,
            runtimeMins: runtimeMins,
            user: {
                connect: {
                    id: userId
                }
            }
        },
    })

    res.json({ data: createdMovie });
};

module.exports = {
    getAllMovies,
    createMovie
};