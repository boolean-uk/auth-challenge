import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const jwtSecret = "mysecret";

const getAllMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();
    res.json({ data: movies });
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;

  try {
    // todo verify the token
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Authorization token missing or invalid." });
    }
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, jwtSecret);
    console.log("Token decoded:", decoded);

    // Create the movie
    const createdMovie = await prisma.movie.create({
      data: {
        title,
        description,
        runtimeMins,
        userId: decoded.userId,
      },
    });
    res.status(201).json({ data: createdMovie });
  } catch (error) {
    console.log("error creating movie", error.message);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token provided." });
    }

    return res.status(501).json({ error: "Internal error." });
  }
};

export { getAllMovies, createMovie };
