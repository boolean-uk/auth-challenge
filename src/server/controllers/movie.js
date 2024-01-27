import jwt from "jsonwebtoken";
import {
  createMovieDb,
  getAllMoviesDb,
  getMovieByTitleDb,
} from "../domains/movie.js";

const jwtSecret = "mysecret";

const getAllMovies = async (req, res) => {
  const allMovies = await getAllMoviesDb();

  return res.status(200).send({ data: allMovies });
};

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;

  if (!title || !description || !runtimeMins) {
    return res.status(400).send({ error: "Missing fields in request body" });
  }

  const titleExists = await getMovieByTitleDb(title);

  if (titleExists) {
    return res
      .status(404)
      .send({ error: "A movie with the provided title already exists" });
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, jwtSecret);
  } catch (e) {
    console.log(e.message);
    return res.status(401).json({ error: "Invalid token provided." });
  }

  const createdMovie = await createMovieDb(title, description, runtimeMins);

  return res.status(201).send({ data: createdMovie });
};

export { getAllMovies, createMovie };
