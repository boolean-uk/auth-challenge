import { useState, useEffect, useContext } from "react";
import { appContext } from "../App";
import MovieForm from "./MovieForm";
import MovieItem from "./MovieItem";

export default function CreateMovie({ setAuthToken, hasAuthToken }) {
  const { apiUrl } = useContext(appContext);
  const [movies, setMovies] = useState([]);
  const [movieStatus, setMovieStatus] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      setAuthToken(true);
    }

    fetch(apiUrl + "/movie")
      .then((res) => res.json())
      .then((data) => setMovies(data.movies));
  }, [movieStatus]);

  const handleCreateMovie = async (movie) => {
    fetch(apiUrl + "/movie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(movie),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setMovieStatus(data.error);
        } else {
          setMovieStatus("New Movie Created!");
        }
      });
  };

  return (
    <>
      {hasAuthToken && (
        <div className="movie-section">
          <h1>Create a movie</h1>
          <MovieForm handleURL={handleCreateMovie} status={movieStatus} />
          <h1>Movie List</h1>
          <ul>
            {movies.map((movie, index) => {
              return <MovieItem key={index} movie={movie} />;
            })}
          </ul>
        </div>
      )}
    </>
  );
}
