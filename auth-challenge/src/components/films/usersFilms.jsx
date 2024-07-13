export default function UsersFilms({film}) {
    return (
        <li>
            <img />
            <h4>{film.title}</h4>
            <p>{film.description}</p>
            <p><strong>Runtime:</strong> {film.runtime} mins</p>
        </li>
    )
}