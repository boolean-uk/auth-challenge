function MovieLi({ movie }) {

    return (
        <li className="movie-li">
            <h3>{movie.title}</h3>
            <p>Description: {movie.description}</p>
            <p>Runtime: {movie.runtimeMins}</p>
        </li>
    )
  }
  
  export default MovieLi