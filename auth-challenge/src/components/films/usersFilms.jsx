export default function UsersFilms({film}) {
    return (
        <li className="users_films_item">
            <h4>{film.title}</h4>
            <p>{film.description}</p>
            <p><strong>Runtime:</strong> {film.runtime} mins</p>
        </li>
    )
}