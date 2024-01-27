import { useEffect, useState } from "react";
import api from "../../../server/api/axios.js";
import { Link } from "react-router-dom";
import MovieList from "./components/MovieList.jsx";
import "./index.css";

export default function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await api.get("/movie");

      setMovies(res.data.data);
    };
    fetchMovies();
  }, []);

  return (
    <div className="movie-container">
      <div className="movie-header">
        <h1>Movie list</h1>
        <Link to="/create-a-movie">Create a Movie!</Link>
      </div>

      <MovieList movies={movies} />
    </div>
  );
}
