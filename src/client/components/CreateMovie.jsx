import axios from "axios"
import { useState } from "react"
import MovieForm from "./MovieForm"

function CreateMovie({ apiUrl, movies, setMovies }) {
    const [createMovieMessage, setCreateMovieMessage] = useState('')

    const handleCreateMovie = async ({ title, description, runtimeMins }) => {
        const token = localStorage.getItem('token')

        try {
          const { data } = await axios.post(`${apiUrl}/movie`, {  title,
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

    return (
        <div className="movie-list--create-movie">
            <h1>Create a movie</h1>
            <MovieForm handleSubmit={handleCreateMovie} />
            {createMovieMessage && <p>{createMovieMessage}</p>}
        </div>
    )
}

export default CreateMovie