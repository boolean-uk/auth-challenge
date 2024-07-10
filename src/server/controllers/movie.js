import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { createMovieDb, getAllMoviesDb } from '../domains/movie.js'
import { AlreadyExists, MissingFields } from '../errors/error.js'

async function getAllMovies(req, res) {
    const movies = await getAllMoviesDb()

    res.json({
        data: movies
    })
}

async function createMovie(req, res) {
    const {title, description, runtimeMins} = req.body

    if(!title || !description || !runtimeMins) {
        throw new MissingFields()
    }

    try {
        const createdMovie = await createMovieDb(title, description, runtimeMins)
    
        res.status(201).json({
            data: createdMovie
        })
    } catch(e) {
        if (e instanceof PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
              throw new AlreadyExists('Title')
            }
          }
    }
}

export {
    getAllMovies,
    createMovie
};