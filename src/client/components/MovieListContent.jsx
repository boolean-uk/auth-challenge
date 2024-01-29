import axios from "axios";
import { useState } from "react";
import MovieForm from "./MovieForm"
import MovieListItems from "./MovieListItems"

function MovieListContent({ apiUrl, movies, setMovies }) {

    const [createMovieMessage, setCreateMovieMessage] = useState('')
    const [deleteAllMoviesMessage, setDeleteAllMoviesMessage] = useState('')

    const handleCreateMovie = async ({ title, description, runtimeMins }) => {
        const token = localStorage.getItem('token')
    
        try {
          const { data } = await axios.post(`${apiUrl}/movie`, {
            title,
            description,
            runtimeMins
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
          )
          const { movie, message } = data
          setMovies([...movies, movie])
          setCreateMovieMessage(message)
        }
        catch (err) {
          setCreateMovieMessage(err.response.data.error)
        }
      }
    
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
        <div className="movie-list--content-container grid">
            <div className="movie-list--create-movie">
            <h1>Create a movie</h1>
            <MovieForm handleSubmit={handleCreateMovie} />
            {createMovieMessage && <p>{createMovieMessage}</p>}
            </div>
            <div className="movie-list--movies-container grid">
            <h1>Movie list</h1>
            <button className='delete-movies-btn' onClick={deleteAllMovies}>Delete all Movies</button>
            {deleteAllMoviesMessage && <p>{deleteAllMoviesMessage}</p>}
            <MovieListItems movies={movies} />
            </div>
        </div>
    )
}

export default MovieListContent