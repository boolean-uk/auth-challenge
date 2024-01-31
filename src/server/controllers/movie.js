import jwt from "jsonwebtoken";
import { createMovie, getMovies } from "../domains/movie.js";
const jwtSecret = "mysecret";

const getAllMovies = async (req, res) => {
  const movies = await getMovies();

  res.status(200).json({ data: movies });
};

const createNewMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;

  try {
    const token = req.headers.authorization.split(" ")[1];

    // todo verify the token
    jwt.verify(token, jwtSecret);
  } catch (err) {
    return res.status(401).json({ error: "Invalid token provided." });
  }

  const createdMovie = await createMovie(title, description, runtimeMins);

  return res.status(201).json({
    newMovie: createdMovie,
    message: "New movie created successfully",
  });
};

export { getAllMovies, createNewMovie };