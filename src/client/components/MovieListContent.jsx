import CreateMovie from "./CreateMovie";
import Movies from "./Movies";

function MovieListContent({ apiUrl, movies, setMovies }) {

    return (
        <div className="movie-list--content-container grid">
            <CreateMovie apiUrl={apiUrl} movies={movies} setMovies={setMovies} />
            <Movies apiUrl={apiUrl} movies={movies} setMovies={setMovies} />
        </div>
    )
}

export default MovieListContent