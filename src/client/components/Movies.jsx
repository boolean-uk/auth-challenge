import axios from "axios"
import { useState } from "react"
import MovieListItems from "./MovieListItems"

function Movies({ apiUrl, movies, setMovies }) {
    const [deleteAllMoviesMessage, setDeleteAllMoviesMessage] = useState('')

    const deleteAllMovies = async () => {
      const token = localStorage.getItem('token')
  
      try {
        const { data } = await axios.delete(`${apiUrl}/movie`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        setMovies([])
        setDeleteAllMoviesMessage(data.message)
      }
      catch (err) {
        setDeleteAllMoviesMessage(err.response.data.eror)
      }
    }

    return (
        <div className="movie-list--movies-container grid">
            <h1>Movie list</h1>
            <button className='delete-movies-btn' onClick={deleteAllMovies}>Delete all Movies</button>
            {deleteAllMoviesMessage && <p>{deleteAllMoviesMessage}</p>}
            <MovieListItems movies={movies} />
        </div>
    )
}

export default Movies