// import { useState } from "react";

// export default function MovieForm({ handleSubmit }) {
//     const [movie, setMovie] = useState({ title: '', description: '', runtimeMins: 60 });

//     const handleSubmitDecorator = (e) => {
//         e.preventDefault();
//         handleSubmit(movie);
//     }

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         setMovie({
//             ...movie,
//             [name]: name === 'runtimeMins' ? parseInt(value) : value
//         });
//     }

//     return (
//         <form onSubmit={handleSubmitDecorator}>
//             <input type='text' name='title' placeholder="Title" value={movie.title} onChange={handleChange} />
//             <input type='text' name='description' placeholder="Description" value={movie.description} onChange={handleChange} />
//             <input type='number' name='runtimeMins' placeholder="Runtime (minutes)" value={movie.runtimeMins} onChange={handleChange} />
//             <button type="submit">Submit</button>
//         </form>
//     );
// }

import { useState } from "react";
import { json } from "react-router-dom";

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

        const response = await fetch(`${apiUrl}/movies`, {
            method: POST,
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
            onAddMovie(json.movie_added)
            setMovie({ title: '', description: '', runtimeMins: '' })
            setError(null)
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
        </form>
    )
}