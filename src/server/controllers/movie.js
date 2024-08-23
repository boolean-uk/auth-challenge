import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";
const secret = process.env.JWT_SECRET;

const createMovie = async (req, res) => {
  const { title, description, runtime } = req.body;

  const runtimeInt = Number(runtime);

  if (!title || !description || !runtime) {
    return res.status(400).json({
      error: "Title, Description, and Runtime are required",
    });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header is missing." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret);

    const foundUser = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (foundUser) {
      const newMovie = await prisma.movie.create({
        data: {
          title,
          description,
          runtime: runtimeInt,
        },
      });
      res.status(201).json({ movie: newMovie });
    }
  } catch (err) {
    console.log("Error:", err);
  }
};

const getAllMovies = async (req, res) => {
  try {
    const allMovies = await prisma.movie.findMany()

    res.status(200).json({ movies: allMovies });
  } catch (err) {
    console.log("Error", err);
  }
}

export { createMovie, getAllMovies };
