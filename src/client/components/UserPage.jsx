import { useState, useEffect } from "react";
import AddMovieForm from "./AddMovieForm";
import MoviesList from "./MoviesList";

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

export default function UserPage({ username }) {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(`${apiUrl}/movies/${username}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setMovies(data.userMovies);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchMovies();
    }, []);

    const handleAddMovie = (newMovie) => {
    setMovies(prevMovies => [...prevMovies, newMovie]);
    };


    return (
        <div>
            <h2>Welcome, {username} </h2>
            <AddMovieForm onAddMovie={handleAddMovie} />
            <h3>Your Movies</h3>
            <MoviesList username={username} movies={movies} setMovies={setMovies} />
        </div>
    );
}