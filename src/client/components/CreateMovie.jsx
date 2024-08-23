import { useState, useEffect, useContext} from "react";
import { appContext } from "../App";
import MovieForm from "./MovieForm";
import MovieItem from "./MovieItem";

export default function CreateMovie({tokenStatus, setTokenStatus}) {
const { apiUrl } = useContext(appContext);
const [movies, setMovies] = useState([]);
const [movieStatus, setMovieStatus] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setTokenStatus(true);
    
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
          console.log("Registration successful:", data.movie);
          setMovieStatus("New Movie Created!");
        }
      });
  };

  return (
    <>
      {tokenStatus && (
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
