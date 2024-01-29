import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import {
  createMovieInDatabase,
  getMoviesFromDatabase,
} from "../domain/movie.js";
const jwtSecret = "mysecret";

const getAllMovies = async (req, res) => {
  try {
    const movies = await getMoviesFromDatabase();
    res.json({ data: movies });
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;

  try {
    const token = req.headers.authorization.split(" ");
    jwt.verify(token[1], jwtSecret);
  } catch (err) {
    return res.status(401).json({ error: "Invalid token provided." });
  }

  try {
    const createdMovie = await createMovieInDatabase(
      title,
      description,
      runtimeMins
    );
    res.status(201).json({ data: createdMovie });
  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAllMovies, createMovie };
