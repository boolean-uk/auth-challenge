import { useState } from "react";

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

export default function AddMovieForm({ onAddMovie }){
    const [movie, setMovie] = useState({ title: '', description: '', runtimeMins: '' })
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleClick = () => {
        setError(null)
        setSuccess(null)
        setMovie({ title: '', description: '', runtimeMins: '' })
    }

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
                    <input className="m-7 px-3 py-1 text-center border-2 border-stone-900 rounded-md shadow-xl" type="text" name="title" value={movie.title} onChange={handleChange} onClick={handleClick} />
                </label>
            </div>
            <div>
                <label>
                    Description:
                    <input className="m-7 px-3 py-1 text-center border-2 border-stone-900 rounded-md shadow-xl" type="text" name="description" value={movie.description} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Runtime (mins):
                    <input className="m-7 px-3 py-1 text-center border-2 border-stone-900 rounded-md shadow-xl"  type="number" name="runtimeMins" value={movie.runtimeMins} onChange={handleChange} />
                </label>
            </div>
            <button type="submit" className="m-7 px-3 py-1 text-center border-2 border-stone-900 rounded-md shadow-xl ">Add Movie</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    )
}