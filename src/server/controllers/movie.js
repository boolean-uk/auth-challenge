import { createMovieDb, getAllMoviesDb } from '../domains/movie.js'

async function getAllMovies(req, res) {
    const movies = await getAllMoviesDb()

    res.json({
        data: movies
    })
}

async function createMovie(req, res) {
    const {title, description, runtimeMins} = req.body

    const createdMovie = await createMovieDb(title, description, runtimeMins)

    res.status(201).json({
        data: createdMovie
    })
}

export {
    getAllMovies,
    createMovie
};