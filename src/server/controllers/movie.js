import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';
import { getAllMoviesDb, createMovieDb, checkTitleExistsDb, deleteAllMoviesDb } from '../domains/movie.js';
const secret = process.env.JWT_SECRET

const getAllMovies = async (req, res) => {
    const movies = await prisma.movie.getAllMoviesDb();
    res.json({ data: movies });
};

const createMovie = async (req, res) => {
    const { title, description, runtimeMins } = req.body;
    const titleExists = await checkTitleExistsDb(title)
    if (titleExists) return res.status(409).json({ error: `${title} is already in the movie list`})

    try {
        const token = null;
        // todo verify the token
    } catch (e) {
        return res.status(401).json({ error: 'Invalid token provided.' })
        const token = req.headers.authorization.slice(7)
        jwt.verify(token, secret)
    } catch {
        return res.status(401).json({ error: 'Invalid token provided, you must be signed in to delete movies.' })
    }

    //const createdMovie = null;

    res.json({ data: createdMovie });
    const createdMovie = await createMovieDb(title, description, runtimeMins)
    res.json({ 
        movie: createdMovie,
        message: `${title} has successfully been added to the movie list!`
    });
};
const deleteAllMovies = async (req, res) => {
    try {
        const token = req.headers.authorization.slice(7)
        jwt.verify(token, secret)
    } catch {
        return res.status(401).json({ error: 'Invalid token provided, you must be signed in to delete movies.' })
    }

    await deleteAllMoviesDb()
    return res.status(200).json({ message: 'All movie list movies have been deleted :(' })
}

export {
    getAllMovies,
    createMovie,
    getAllMovies,
    createMovie,
    deleteAllMovies
};
