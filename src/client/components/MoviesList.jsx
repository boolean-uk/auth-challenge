import { useEffect, useState } from "react";

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

export default function MoviesList({ username, movies, setMovies }) {
    // const [movies, setMovies] = useState([])

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`${apiUrl}/movies/${username}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                })
                 if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setMovies(data.userMovies);
            } catch (e) {
                console.error('A problem occured while fetching movies',e)
            }
        }
        fetchMovies()
    },[])


    return (
        <ul>
            {movies.map(movie => (
                <li key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>Description: {movie.description}</p>
                    <p>Runtime: {movie.runtimeMins} minutes</p>
                </li>
            ))}
        </ul>
    )
}