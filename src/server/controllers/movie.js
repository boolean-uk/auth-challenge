import { createMovieDb, getAllMoviesDb, verifyTitle } from "../domain/movie.js"
import {
  ExistingUniqueFieldError,
  MissingFieldsError,
} from "../errors/APIError.js"

const getAllMovies = async (req, res) => {
  const movies = await getAllMoviesDb()

  res.json({
    movies,
  })
}

const createMovie = async (req, res) => {
  const { title, description, runtime } = req.body

  if (!title || !description || !runtime) {
    throw new MissingFieldsError("Missing fields in request body")
  }

  const existingTitle = await verifyTitle(title)

  if (existingTitle) {
    throw new ExistingUniqueFieldError("The title provided already exists")
  }

  const movie = await createMovieDb(title, description, runtime, req)

  res.status(201).json({
    movie,
  })
}

export { getAllMovies, createMovie }
