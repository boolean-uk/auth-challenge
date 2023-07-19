const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwtSecret = "mysecret";

const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany({});

  res.json({ data: movies });
};

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;

  const createdMovie = await prisma.movie.create({
    data: {
      title,
      description,
      runtimeMins,
    },
  });
  try {
    // todo verify the token
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, jwtSecret);
  } catch (e) {
    return res.status(401).json({ error: "Invalid token provided." });
  }

  res.json({ data: createdMovie });
};
module.exports = {
  getAllMovies,
  createMovie,
};
