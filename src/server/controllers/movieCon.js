import {
  createMovieDb,
  getMoviesDb,
  deleteMovieDb,
} from "../queries/movies.js";

export const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;

  if (!title || !description || !runtimeMins) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    // Here we extract the userId from req.user that we added in authenticateToken function
    const movie = await createMovieDb(
      title,
      description,
      runtimeMins,
      req.user.userId
    );
    res.status(201).json(movie);
  } catch (error) {
    res.status(409).json(error);
  }
};

export const getMovies = async (req, res) => {
  // Here we use the req.user again
  // This condition to only get this user's movies
  try {
    const movies = await getMoviesDb(req.user.userId);
    res.status(200).json(movies);
  } catch (error) {
    res.status(404).json({ error: "Failed to load movies" });
  }
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteMovieDb(Number.parseInt(id, 10));
    res.status(200).json({ message: "Movie has been deleted successfully!" });
  } catch (error) {
    res.status(404).json({ error: "Movie is not found" });
  }
};
