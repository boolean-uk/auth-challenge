import jwt from "jsonwebtoken";
const jwtSecret = "mysecret";

import { createMovieDB, getMoviesDB } from "../domain/movie.js";

const getAllMovies = async (req, res) => {
    const movies = await getMoviesDB();
    res.json({ data: movies });
};

const createMovie = async (req, res) => {
    const { title, description, runtimeMins } = req.body;

    try {
        const token = req.headers.authorization.split(" ");
        jwt.verify(token[1], jwtSecret);
    } catch (err) {
        return res.status(401).json({ error: "Invalid token provided." });
    }
    const createdMovie = await createMovieDB(title, description, runtimeMins);
    return res.status(201).json({ data: createdMovie, message: "Movie created" });
};

export { getAllMovies, createMovie };
