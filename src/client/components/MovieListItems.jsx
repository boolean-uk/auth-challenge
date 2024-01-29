function MovieListItems({ movies }) {
    
    return (
        <ul>
            {movies.map(movie =>
                <li key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>Description: {movie.description}</p>
                    <p>Runtime: {movie.runtimeMins}</p>
                </li>
            )}
        </ul>
    )
}

export default MovieListItems