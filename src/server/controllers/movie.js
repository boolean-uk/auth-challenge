const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwtSecret = "mysecret";

const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany();

  res.json({ data: movies });
};

const createMovie = async (req, res) => {
  const authHeader = req.headers.authorization;

  const tokenParts = authHeader.split(" ");

  const token = tokenParts[1];
  const { title, description, runtimeMins } = req.body;

  if (!token) {
    return res.status(401).json({ error: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    const createdMovie = await prisma.movie.create({
      data: {
        title,
        description,
        runtimeMins,
      },
    });

    res.status(201).json({ data: createdMovie });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token." });
    }
    console.error("Error creating the movie:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  getAllMovies,
  createMovie,
};
