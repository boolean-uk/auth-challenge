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
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized: Missing Token" });
    }

    const token = authHeader.split(" ")[1];
    console.log("this is the token line 24:",token);
    const verifyToken = async (token, secret) => {
      try {
        const result = await jwt.verify(token, secret);
        return result;
      } catch (error) {
        console.log(error.message);
        throw new Error("Invalid token");
      }
    };

    try {
      const tokenVerified = await verifyToken(token, jwtSecret);
        console.log("token verified:", tokenVerified)
      if (tokenVerified) {
        const createdMovie = await prisma.movie.create({
          data: {
            title,
            description,
            runtimeMins,
          },
        });

        res.json({ data: createdMovie });
      } else {
        return res.status(401).json({ error: "Invalid token provided." });
      }
    } catch (error) {
      res
        .status(401)
        .json({ error: error.message || "Invalid token provided." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export { getAllMovies, createMovie };
