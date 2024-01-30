import { Movie } from "./Movie"

const MovieList = ({ movies })  => {
    return(
        <>
            <section>
                <h2>All Movies</h2>
                <ul>
                    {movies && movies.movies.toReversed().map((movie, index)=> (
                        <Movie key={index + "movie"} movie={movie} />
                    ))}
                </ul>
            </section>
        </>
    )
}

export { MovieList }