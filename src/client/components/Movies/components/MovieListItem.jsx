export default function MovieListItem({ movie }) {
  return (
    <li className="movie-list--item">
      <h3>{movie.title}</h3>
      <p>{movie.description}</p>
      <p>Runtime: {movie.runtimeMins}mins</p>
    </li>
  );
}
