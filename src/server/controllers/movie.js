import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { createMovieDB } from "../domain/movie.js";

const jwtSecret = "mysecret";

const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany();

  res.json({ data: movies });
};

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;

  try {
    const tokenHeader = req.headers.authorization;

    const token = tokenHeader.split(" ")[1];

    jwt.verify(token, jwtSecret);
  } catch (error) {
    return res.status(401).json({ error: "Invalid token provided." });
  }

  const createdMovie = await createMovieDB(title, description, runtimeMins);

  res.json({ data: createdMovie });
};

export { getAllMovies, createMovie };
