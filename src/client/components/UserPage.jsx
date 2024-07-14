import { useState } from "react";
import AddMovieForm from "./AddMovieForm";
import MoviesList from "./MoviesList";

export default function UserPage({ username }) {
    const [movies, setMovies] = useState([])

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