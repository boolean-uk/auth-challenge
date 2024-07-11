/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import MovieCard from "./MovieCard";

export default function MoviesPage({ user }) {
  return (
    <div className="grid place-items-center">
      <h1 className="text-4xl my-4">The Boolean Movie Database</h1>
      <p className="my-2">{`${user.username}`}'s Movies</p>
      <ul className="flex flex-row gap-2">
        {user.movies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </ul>
    </div>
  );
}
