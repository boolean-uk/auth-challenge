import { useState } from "react"
import MovieLi from "./MovieLi"

function MovieForm({ handleSubmit, error, setError, movies }) {
    const [movieData, setMovieData] = useState({ 
        title: '', 
        description: '', 
        runtimeMins: 60 
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setMovieData({
            ...movieData,
            [name]: name === 'runtimeMins' ? parseInt(value) : value
        })
    }

    function handleSubmitDecorator(e) {
        e.preventDefault()

        if (!movieData.title || !movieData.description || !movieData.runtimeMins) {
            setError('Missing fields in body')

            return
        }

        setError(null)
        
        handleSubmit(movieData)
        
        setMovieData({ 
            title: '', 
            description: '', 
            runtimeMins: 60 
        })
    }

    return (
        <>
            <h2>Create a movie</h2>

            <form onSubmit={handleSubmitDecorator}>
                {error && <p>{error}</p>}

                <input type='text' name='title' placeholder="Title" value={movieData.title} onChange={handleChange} />
                <input type='text' name='description' placeholder="Description" value={movieData.description} onChange={handleChange} />
                <input type='number' name='runtimeMins' placeholder="Runtime (minutes)" value={movieData.runtimeMins} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>

            <h2>Movie list</h2>
            <ul className='movie-ul'>
            {movies.map((movie, index) => {
                return <MovieLi key={index} movie={movie} />})
            }
            </ul>
        </>
    )
  }
  
  export default MovieForm