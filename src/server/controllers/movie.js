const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwtSecret = "mysecret";

const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany({});

  res.json({ data: movies });
};

const createMovie = async (req, res) => {
  console.log("request: ", req.body);
  try {
    const token = req.headers.authorization.substring(7);
    console.log("token:", token);
    jwt.verify(token, jwtSecret);
  } catch (e) {
    console.log("error:", e);
    console.log("headers:", req.headers);
    return res.status(401).json({ error: "Invalid token provided." });
  }
  const { title, description, runtimeMins } = req.body;

  const movieCreated = await prisma.movie.create({
    data: {
      title: title,
      description: description,
      runtimeMins: runtimeMins,
    },
  });

  const createdMovie = movieCreated;

  res.json({ data: createdMovie });
};

module.exports = {
  getAllMovies,
  createMovie,
};
