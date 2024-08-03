import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const jwtSecret = "mysecret";

const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany();

  res.json({ data: movies });
};

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;

  try {
    const token = req.headers.authorization.split("");
    const decodedToken = jwt.verify(token, jwtSecret);

    if (!decodedToken) {
      throw new Error("Invalid key");
    }
    const createdMovie = await prisma.movie.create({
      data: {
        title: title,
        description: description,
        runtimeMins: runtimeMins,
      },
    });
    res.status(201).json({ data: createdMovie });
  } catch (e) {
    return res.status(401).json({ error: "Invalid" });
  }
};
export { getAllMovies, createMovie };
