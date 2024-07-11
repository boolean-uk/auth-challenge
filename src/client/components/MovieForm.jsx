import { useEffect, useState } from "react"
import MovieLi from "./MovieLi"
import { useContext } from "react"
import { DataContext } from "../App"

function MovieForm() {
    const { handleCreateMovie, createMovieError, setCreateMovieError, movies, setMovies, apiUrl } = useContext(DataContext)

    useEffect(() => {
        async function getMovies() {
            const options = {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                },
            }
    
            const response = await fetch(apiUrl + '/movie', options)

            if (response.status >= 400) {
                const errorText = await response.text()
                const errorData = JSON.parse(errorText)
        
                setCreateMovieError(errorData.error)
        
                return
            }

            setCreateMovieError(null)

            const data = await response.json()
        
            setMovies(data.data)
        }
    
        getMovies()
      }, [apiUrl, setMovies, setCreateMovieError])
    
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
            setCreateMovieError('Missing fields in body')

            return
        }

        setCreateMovieError(null)
        
        handleCreateMovie(movieData)
        
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
                {createMovieError && <p className="error-message">{createMovieError}</p>}

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