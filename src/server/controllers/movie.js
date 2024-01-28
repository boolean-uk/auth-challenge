// DB
import { getMoviesDb, createMovieDb } from '../domains/movie.js'

// Helpers
import {
  checkToken,
  checkFields,
  checkTitleExist
} from '../helpers/movieErrorHandler.js'

const getMovies = async (req, res) => {
  const { authorization } = req.headers

  try {
    checkToken(authorization)

    const movies = await getMoviesDb()

    res.status(200).json({ movies })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
}

const createMovie = async (req, res) => {
  const { authorization } = req.headers
  const { title, description, runTime } = req.body

  try {
    checkToken(authorization)
    checkFields([title, description, runTime])
    await checkTitleExist(title)

    const createdMovie = await createMovieDb(title, description, runTime)

    res.status(201).json({ movie: createdMovie })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
}

export { getMovies, createMovie }
