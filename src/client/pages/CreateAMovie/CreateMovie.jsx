import MovieForm from "../../components/Movies/components/MovieForm.jsx";
import api from "../../../server/api/axios.js";

import { useState } from "react";
import "./index.css";

export default function CreateMovie() {
  const [movieMessage, setMovieMessage] = useState("");

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    try {
      const token = localStorage.getItem("user_login_token");

      const res = await api.post(
        "/movie",
        { title, description, runtimeMins },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const createdMovie = res.data.data;

      setMovies([...movies, createdMovie]);
      setMovieMessage("Created movie successfully");
    } catch (e) {
      console.log(e.message);
      setMovieMessage(
        e.response.data.error ?? "Failed attempting to create movie"
      );
    }
  };

  return (
    <div className="create-movie-page">
      <h1>Create a movie</h1>
      <MovieForm handleSubmit={handleCreateMovie} />
      {movieMessage && <p>{movieMessage}</p>}
    </div>
  );
}
