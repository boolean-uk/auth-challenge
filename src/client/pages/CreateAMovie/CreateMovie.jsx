import MovieForm from "../../components/Movies/components/MovieForm.jsx";
import api from "../../../server/api/axios.js";

import { useContext, useState } from "react";
import { MovieContext } from "../../contexts.js";
import { useNavigate } from "react-router-dom";
import "../forms.css";

export default function CreateMovie() {
  const [movieMessage, setMovieMessage] = useState("");
  const { movies, setMovies } = useContext(MovieContext);

  const navigate = useNavigate();

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
    <div className="create-movie-page form-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        Go back
      </button>

      <div className="create-movie--form form-container">
        <h1>Create a movie</h1>
        <MovieForm handleSubmit={handleCreateMovie} />
        {movieMessage && <p className="error-message">{movieMessage}</p>}
      </div>
    </div>
  );
}
