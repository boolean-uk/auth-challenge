const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getMovies = async (req, res) => {
  const movieList = await prisma.movie.findMany();

  res.status(200).json(movieList);
};

const addMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;

  const newMovie = await prisma.movie.create({
    data: {
      title: title,
      description: description,
      runtimeMins: Number(runtimeMins),
    },
  });

  res.status(201).json({ movie: newMovie });
};

module.exports = { addMovie, getMovies };
