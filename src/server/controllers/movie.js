import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { createMovieDB, findMovieDB, deleteMovieDB } from "../domain/movie.js";

const jwtSecret = "mysecret";

const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany();

  res.json({ data: movies });
};

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;

  if (!title || !description || !runtimeMins) {
    return res.status(406).json({ error: "All fields are required" });
  }

  const existingMovie = await findMovieDB(title);
  if (existingMovie) {
    res.status(409).json({ error: "Movie with such title already exists" });
  }

  try {
    const tokenHeader = req.headers.authorization;

    const token = tokenHeader.split(" ")[1];

    jwt.verify(token, jwtSecret);
  } catch (error) {
    return res.status(401).json({ error: "Invalid token provided." });
  }

  const createdMovie = await createMovieDB(title, description, runtimeMins);

  res.status(201).json({ data: createdMovie });
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMovie = await deleteMovieDB(id);
    res.status(204).json({ data: deletedMovie });
  } catch (error) {
    res.status(500).json({ error: "Internal Error" });
  }
};

export { getAllMovies, createMovie, deleteMovie };
