const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const secret = process.env.JWT_SECRET;

const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany();

  res.json({ movies });
};

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;
  let bearer = req.headers.authorization;

  if (!bearer) {
    return res.status(403).json({ error: "Please log in" });
  }

  bearer = bearer.replace("Bearer ", "");

  try {
    const verified = jwt.verify(bearer, secret);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const createdMovie = await prisma.movie.create({
    data: {
      title,
      description,
      runtimeMins,
    },
  });

  res.status(201).json({ status: "success", movie: createdMovie });
};

module.exports = { getAllMovies, createMovie };
