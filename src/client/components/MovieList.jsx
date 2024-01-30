import { useEffect, useState } from "react";
import localRequest from "../utils/localRequest";

export default function MovieList({ loadMovieList, setLoadMovieList }) {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    async function getMovies() {
      const response = await localRequest.getUrl("movie");
      setMovieList(response.movies);
    }
    if (loadMovieList) {
      getMovies();
      setLoadMovieList(false);
    }
  }, [loadMovieList]);

  if (movieList.length > 0) {
    return displayMovieList(movieList);
  }
}

function displayMovieList(movieList) {
  return movieList.map((movie) => {
    const { title, description, runtimeMins } = movie;

    return (
      <div key={`movie: ${title}`}>
        Title: {title}, Description: {description}, runtimeMins: {runtimeMins}
      </div>
    );
  });
}
