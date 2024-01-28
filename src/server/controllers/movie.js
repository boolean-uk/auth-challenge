import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const jwtSecret = "mysecret";

const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany();

  res.json({ data: movies });
};

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;

  try {
    // 1. Get the token from the request header
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Authorization token missing." });
    }

    // 2. Verify the token
    const decodedToken = jwt.verify(token, jwtSecret);
    console.log(decodedToken);
    // 3. Create the movie if verification is successful
    const createdMovie = await prisma.movie.create({
      data: {
        title,
        description,
        runtimeMins,
      },
    });

    res.json({ data: createdMovie });
  } catch (error) {
    console.error("Error creating movie:", error.message);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token provided." });
    }

    return res.status(500).json({ error: "Internal server error." });
  }
};
export { getAllMovies, createMovie };
