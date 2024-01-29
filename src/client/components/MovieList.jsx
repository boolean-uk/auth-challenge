import { useEffect, useState } from "react";
import Logout from "./Logout"
import MovieListContent from "./MovieListContent";

import '../styles/movie-list.css'
import '../styles/logout.css'

function MovieList({ apiUrl }) {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(`${apiUrl}/movie`)
          .then(res => res.json())
          .then(res => setMovies(res.data));
      }, [apiUrl]);

    return (
        <section className="movie-list--container grid">
            <Logout />
            <MovieListContent apiUrl={apiUrl} movies={movies} setMovies={setMovies} />
        </section>
    )
}

export default MovieList