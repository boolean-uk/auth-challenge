import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { createMovieDb, getAllMoviesDb } from '../domains/movie.js'
import { AlreadyExistsError, MissingFieldsError } from '../errors/error.js'

async function getAllMovies(req, res) {
    const foundUser = req.user

    const movies = await getAllMoviesDb(foundUser)

    res.json({
        data: movies
    })
}

async function createMovie(req, res) {
    const {title, description, runtimeMins} = req.body
    const foundUser = req.user

    if(!title || !description || !runtimeMins) {
        throw new MissingFieldsError()
    }

    try {
        const createdMovie = await createMovieDb(title, description, runtimeMins, foundUser)
    
        res.status(201).json({
            data: createdMovie
        })
    } catch(e) {
        if (e instanceof PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
              throw new AlreadyExistsError('Title')
            }
          }
    }
}

export {
    getAllMovies,
    createMovie
}