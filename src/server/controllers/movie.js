import { createMovie, selectAllMovies } from "../domains/movie.domain.js";
import { handleError } from "../utils/error.js";
// eslint-disable-next-line no-unused-vars
import * as Types from "../utils/types.d.js";

/**
 * @param {Types.ExRequest} req
 * @param {Types.ExResponse} res
 * @returns {Promise<void>}
 */
async function submitMovie(req, res) {
  try {
    const { title, description, runtimeMins } = req.body;
    const newMovie = await createMovie(title, description, runtimeMins);
    const payload = {
      movie: {
        id: newMovie.id,
        title: newMovie.title,
        description: newMovie.description,
        runtimeMins: newMovie.runtimeMins,
      },
    };
    res.status(201).json(payload);
  } catch (error) {
    handleError(error, res);
  }
}

/**
 * @param {Types.ExRequest} req
 * @param {Types.ExResponse} res
 * @returns {Promise<void>}
 */
async function getAllMovies(req, res) {
  try {
    const movieList = await selectAllMovies();
    const payload = {
      movies: movieList,
    };
    res.status(200).json(payload);
  } catch (error) {
    handleError(error, res);
  }
}

export { getAllMovies, submitMovie };
