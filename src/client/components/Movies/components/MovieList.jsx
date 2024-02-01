import MovieListItem from "./MovieListItem";

export default function MovieList({ movies }) {
  return (
    <ul className="movie-list">
      {movies.map((movie, idx) => (
        <MovieListItem movie={movie} key={idx} />
      ))}
    </ul>
  );
}
