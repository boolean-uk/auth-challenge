const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwtSecret = "mysecret";

const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany();

  res.json({ data: movies });
};

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;

  try {
    const [_, token] = req.headers.authorization.split(" ");

    jwt.verify(token, jwtSecret);
  } catch (e) {
    return res.status(401).json({ error: "Invalid token provided." });
  }

  try {
    const createdMovie = await prisma.movie.create({
      data: { title, description, runtimeMins },
    });

    res.json({ data: createdMovie });
  } catch (e) {
    res.status(409).json({ error: "Movie title already exists." });
  }
};

module.exports = {
  getAllMovies,
  createMovie,
};
