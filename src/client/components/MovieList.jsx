import { Movie } from "./Movie"

const MovieList = ({ movies })  => {

    return(
        <>
            <section>
                <h2>Current list</h2>
                <ul>
                    {movies && movies.movies.map((movie, index)=> (
                        <Movie key={index + "movie"} movie={movie} />
                    ))}
                </ul>
            </section>
        </>
    )
}

export { MovieList }