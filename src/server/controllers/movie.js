import jwt from "jsonwebtoken";
import { getAllMoviesDb } from "../domains/movie.js";
const jwtSecret = "mysecret";

const getAllMovies = async (req, res) => {
  const movies = await getAllMoviesDb();

  res.status(200).json({ data: movies });
};

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;

  try {
    const token = null;
    // todo verify the token
  } catch (e) {
    return res.status(401).json({ error: "Invalid token provided." });
  }

  const createdMovie = null;

  res.json({ data: createdMovie });
};

export { getAllMovies, createMovie };
