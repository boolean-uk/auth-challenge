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
    console.log(token);
    // todo verify the token
    jwt.verify(token, jwtSecret);
  } catch (e) {
    return res.status(401).json({ error: "Invalid token provided." });
  }
  const createdMovie = await prisma.movie.create({
    data: {
      title: title,
      description: description,
      runtimeMins: runtimeMins,
    },
  });
  const allMovies = await prisma.movie.findMany(); // Fetch all movies after creation
  res.json({ data: allMovies });
};

module.exports = {
  getAllMovies,
  createMovie,
};
