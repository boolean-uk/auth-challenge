import { getMoviesDb } from '../domains/movies.js'

async function getMovies(req, res) {
    
    const movies = await getMoviesDb()
    res.status(200).json({ movies })
}

export { getMovies }