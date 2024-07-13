export default function UsersFilms({film}) {
    console.log(film)
    return (
        <li>
            <h4>{film.title}</h4>
            <p>{film.description}</p>
            <p>{film.runTime}</p>
        </li>
    )
}