/* eslint-disable react/prop-types */
import url from "../utils/baseurl"

export default function MovieCard({ movie, getMovies }) {

    async function handleClick() {
        await fetch(`${url}/movies/${movie.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type": "application/json",
            }
        })
        getMovies()
    }


    return (
    <li className="list-none rounded-md bg-teal-100 drop-shadow-md h-40 w-48 flex justify-between p-4 flex-col text-center">
        <p className="text-xl">{movie.title}</p>
        <p className="text-sm">{movie.description}</p>
        <p className="text-xs place-self-center">Runtime: {movie.runtimeMins} minutes</p>
        <p className="text-xs text-red-500 cursor-pointer" onClick={handleClick}>Delete</p>
        </li>
    )
}