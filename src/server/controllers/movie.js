// DB
import { createMovieDb } from '../domains/movie.js'

// Helpers
import {
  checkToken,
  checkFields,
  checkTitleExist
} from '../helpers/movieErrorHandler.js'

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

export { createMovie }
