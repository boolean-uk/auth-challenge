import { getMoviesDb, createMovieDb } from "../domains/movies.js";
import jwt from 'jsonwebtoken'

async function getMovies(req, res) {
  const [_, token] = req.headers.authorization.split(' ')
  const { username } = jwt.decode(token)

  const movies = await getMoviesDb(username);
  res.status(200).json({ movies });
}

async function createMovie(req, res) {
  const { title, description, runtimeMins, username } = req.body;

  try {
    const movie = await createMovieDb(
      title,
      description,
      runtimeMins,
      username
    );
    res.status(201).json({ movie });
  } catch (e) {
    if (e.code === "P2002") {
      res.status(409).json({ error: "A movie already exists with that title" });
    } else {
      res.status(400).json({ error: "Something went wrong adding movie" });
    }
    console.log(e);
  }
}

export { getMovies, createMovie };