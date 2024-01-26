import { useEffect, useState } from "react"
import { Movie } from "./Movie"

const MovieList = ({ apiUrl })  => {
    const [movies, setMovies] = useState(undefined)

    const getMovies = () => {
        const options = {
            method: "GET",
            headers: {"constent-type":"application/json"}
        }
        fetch(`${apiUrl}/movie`, options)
        .then(res => res.json())
        .then(setMovies)
    }

    useEffect(getMovies, [])

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