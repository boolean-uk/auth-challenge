import jwt from "jsonwebtoken"
import {
	createMovieDb,
	getAllMoviesDb,
	getMovieByTitleDB,
	getUserMoviesDb,
} from "../domains/movie.js"
import {
	ExistingDataError,
	MissingFieldsError,
} from "../errors/errors.js"

export const getAllMovies = async (req, res) => {
	const allMovies = await getAllMoviesDb()
	res.status(200).json({ allMovies })
}

export const createMovie = async (req, res) => {
	const { title, description, runtimeMins } = req.body

	if (!title || !description || !runtimeMins) {
		throw new MissingFieldsError(
			"Title, description, and runtime in minutes must be provided in order to add a new movie"
		)
	}

	const existingMovie = await getMovieByTitleDB(title)
	if (existingMovie) {
		throw new ExistingDataError("This movie exists")
	}
    
	const newMovie = await createMovieDb(
		title,
		description,
		Number(runtimeMins),
		req.user.username
	)
	res.status(201).json({
		movie_added: newMovie,
		added_by: req.user.username,
		jwt: req.token,
	})
}

export const getUserMovies = async (req, res) => {
    const username = req.user.username
	const userMovies = await getUserMoviesDb(username)
	res.status(200).json({ userMovies })
}
