export default function UsersFilms({film}) {
    return (
        <li>
            <img />
            <h4>{film.title}</h4>
            <p>{film.description}</p>
            <p>Runtime: {film.runtime} mins</p>
        </li>
    )
}