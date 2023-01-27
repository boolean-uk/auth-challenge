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
  console.log(title, description, runtimeMins);
  try {
    const secret = process.env.JWT_SECRET;
    const token = req.headers.authorization;
    console.log(token, secret);
    // todo verify the token
    jwt.verify(token, secret);
    const createdMovie = await prisma.movie.create({
      data: {
        title: title,
        description: description,
        runtimeMins: runtimeMins,
      },
    });
    res.json({ data: createdMovie });
  } catch (e) {
    return res.status(401).json({ error: "Invalid token provided." });
  }
};

module.exports = {
  getAllMovies,
  createMovie,
};
