import '../styles/movie-list-items.css'

function MovieListItems({ movies }) {
    
    return (
        <ul className='movie-list-items--container grid'>
            {movies.map(movie =>
                <li className='movie-list-items--item grid' key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>Description: {movie.description}</p>
                    <p>Runtime: {movie.runtimeMins}</p>
                </li>
            )}
        </ul>
    )
}

export default MovieListItems