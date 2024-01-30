import { useEffect } from "react"
import { MyMovie } from "./MyMovie"
import { getMyMovies } from "../../helpers/api-get"

const MyMovieList = ({ myMovies, setMyMovies })  => {

    useEffect(() => getMyMovies(setMyMovies), [])

    return(
        <>
            <section>
                <h2>My List</h2>
                <ul>
                    {myMovies && myMovies.toReversed().map((myMovie, index)=> (
                        <MyMovie key={index + "movie"} myMovie={myMovie} />
                    ))}
                </ul>
            </section>
        </>
    )
}

export { MyMovieList }