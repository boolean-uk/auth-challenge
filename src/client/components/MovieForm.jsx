import { useState } from "react"

function MovieForm({ handleSubmit }) {
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
        
        handleSubmit(movieData)
        
        setMovieData({ 
            title: '', 
            description: '', 
            runtimeMins: 60 
        })
    }

    return (
        <form onSubmit={handleSubmitDecorator}>
            <input type='text' name='title' placeholder="Title" value={movieData.title} onChange={handleChange} />
            <input type='text' name='description' placeholder="Description" value={movieData.description} onChange={handleChange} />
            <input type='number' name='runtimeMins' placeholder="Runtime (minutes)" value={movieData.runtimeMins} onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    )
  }
  
  export default MovieForm