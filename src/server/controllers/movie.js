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
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, jwtSecret);
    res.json({ data: token });
    // todo verify the token
  } catch (e) {
    return res.status(401).json({ error: "Invalid token provided." });
  }

  if (token) {
    console.log(token);
    const createdMovie = await prisma.movie.create({
      title,
      description,
      runtimeMins,
    });
    console.log(createdMovie);
    res.json({ data: createdMovie });
  }
};

module.exports = {
  getAllMovies,
  createMovie,
};
