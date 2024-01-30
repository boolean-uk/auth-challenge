import jwt from "jsonwebtoken";
import { createMovieDb, getAllMoviesDb } from "../domains/movie.js";
const jwtSecret = "mysecret";

const getAllMovies = async (req, res) => {
  const movies = await getAllMoviesDb();

  res.status(200).json({ data: movies });
};

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;

  try {
    const token = req.headers.authorization.split(" ")[1];

    // todo verify the token
    jwt.verify(token, jwtSecret);
  } catch (err) {
    return res.status(401).json({ error: "Invalid token provided." });
  }

  const createdMovie = await createMovieDb(title, description, runtimeMins);

  return res.status(201).json({
    newmovie: createdMovie,
    message: "New movie created successfully",
  });
};

export { getAllMovies, createMovie };
