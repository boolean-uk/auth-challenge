/* eslint-disable react/prop-types */
export default function MovieCard({ movie }) {
    return (
    <li className="list-none rounded-md bg-teal-100 drop-shadow-md h-56 w-48 flex justify-between p-4 flex-col text-center">
        <p className="text-xl">{movie.title}</p>
        <p className="text-sm">{movie.description}</p>
        <p className="text-xs place-self-center">Runtime: {movie.runtimeMins} minutes</p>
    </li>
    )
}