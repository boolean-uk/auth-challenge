export default function FilmBanner({ film }) {
    return (
        <li key={film.id} className="film_list_item">
          <img src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
          />
        </li>
    )
}