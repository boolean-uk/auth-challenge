import jwt from "jsonwebtoken";

const jwtSecret = "mysecret";

import { create, all } from "../domains/movie.js";

const getAllMovies = async (req, res) => {
  const movies = await all();

  res.json({ data: movies });
};

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;

  try {
    const token = req.headers.authorization;
    // todo verify the token
    jwt.verify(token, jwtSecret)
  } catch (e) {
    return res.status(401).json({ error: "Invalid token provided." });
  }

  const createdMovie = await create(title, description, runtimeMins);

  res.json({ data: createdMovie });
};

export { getAllMovies, createMovie };
