import jwt from 'jsonwebtoken';
import { getAllMoviesDb, createMovieDb, checkTitleExistsDb } from '../domains/movie.js';
const secret = process.env.JWT_SECRET

const getAllMovies = async (req, res) => {
    const movies = await getAllMoviesDb()
    res.json({ data: movies });
};

const createMovie = async (req, res) => {
    const { title, description, runtimeMins } = req.body

    const titleExists = await checkTitleExistsDb(title)
    if (titleExists) return res.status(409).json({ error: `${title} is already in the movie list`})

    try {
        const token = req.headers.authorization.slice(7)
        jwt.verify(token, secret)
    } catch (e) {
        return res.status(401).json({ error: 'Invalid token provided.' })
    }

    const createdMovie = await createMovieDb(title, description, runtimeMins)
    res.json({ 
        movie: createdMovie,
        message: `${title} has successfully been added to the movie list!`
    });
};

export {
    getAllMovies,
    createMovie
};
