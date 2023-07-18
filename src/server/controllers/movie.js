const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwtSecret = "mysecret";

const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany();
  res.json({ data: movies });
  console.log('zzzzzzzzzzzzzzzz', movies);
};

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;
  const bearerToken = req.headers.authorization;
  const token = bearerToken.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorised" });
  }

  try {
    // const verified_payload = jwt.verify(token, jwtSecret);
    jwt.verify(token, jwtSecret);

    const createdMovie = await prisma.movie.create({
      data: {
        title,
        description,
        runtimeMins,
      },
    });

    if (createdMovie) {
      res.status(201).json({ movie: createdMovie });
      console.log({ movie: createdMovie });
    } else {
      return res.ststaus(400).json({ error: "Error creating movie" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Invalid token provided." });
  }
};

module.exports = {
  getAllMovies,
  createMovie,
};
