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
        <>
            <div className="h-5/6">

            <h2 className="mt-12 p-3 text-2xl text-center">Welcome, {username} </h2>
            <div className='sticky grid gap-3 grid-cols-2'>
                <div className="p-5 bg-stone-800 border-2 border-solid border-stone-700 rounded-md">
                    <AddMovieForm onAddMovie={handleAddMovie} />
                </div>
                <div className="p-5 bg-stone-800 border-2 border-solid border-stone-700 rounded-md shadow-xl">
                    <h3 className="mb-3 text-xl text-center" >Your Movies</h3>
                    <MoviesList username={username} movies={movies} setMovies={setMovies} />
                </div>
            </div>
            </div>
        </>
    );
}