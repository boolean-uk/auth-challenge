const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const mySecret = process.env.JWT_SECRET;

const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany();

  res.json({ data: movies });
};

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;

  const tokenRaw = req.get("Authorization");

  if (!tokenRaw) {
    return res.status(401).json({ error: "Invalid token provided." });
  }
  const token = tokenRaw.replace("Bearer ", "");
  const verifiedToken = await jwt.verify(token, mySecret);

  const createdMovie = await prisma.movie.create({
    data: {
      title,
      description,
      runtimeMins,
    },
  });

  res.status(201).json({ data: createdMovie });
};

module.exports = {
  getAllMovies,
  createMovie,
};
