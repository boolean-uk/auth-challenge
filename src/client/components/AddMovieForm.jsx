import { useState } from "react";

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

export default function AddMovieForm({ onAddMovie }){
    const [movie, setMovie] = useState({ title: '', description: '', runtimeMins: '' })
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target
        setMovie(prevMovie => ({
            ...prevMovie, [name]: value
        }))
        setError(null)
        setSuccess(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${apiUrl}/movies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                },
                body: JSON.stringify(movie)
            })
            const result = await response.json()
            if (!response.ok) {
                throw new Error(result.error)
            } else {
                onAddMovie(result.movie_added)
                setMovie({ title: '', description: '', runtimeMins: '' })
                setSuccess('Movie added succesfully!')
                setError(null)
            }            
        }catch (error) {
            setError(error.message);
        }

    }    
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Title:
                    <input type="text" name="title" value={movie.title} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Description:
                    <input type="text" name="description" value={movie.description} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Runtime (mins):
                    <input type="number" name="runtimeMins" value={movie.runtimeMins} onChange={handleChange} />
                </label>
            </div>
            <button type="submit">Add Movie</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    )
}