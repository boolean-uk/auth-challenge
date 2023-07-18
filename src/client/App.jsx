import { useEffect, useState } from "react";
import "./App.css";
import MovieForm from "./components/MovieForm";
import UserForm from "./components/UserForm";

const apiUrl = "http://localhost:4000";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then((res) => res.json())
      .then((res) => setMovies(res.data));
  }, []);

  // REGISTER
  const handleRegister = async ({ username, password }) => {
    try {
      const response = await fetch(`${apiUrl}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      // response from the server containing id and username
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Error");
    }
  };

  // LOGIN
  const handleLogin = async ({ username, password }) => {
    try {
      const response = await fetch(`${apiUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      localStorage.setItem("accessToken", data.token);
      console.log("token", data.token);
    } catch (error) {
      console.log("Error");
    }
  };

  // MOVIE
  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(`${apiUrl}/movie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          runtimeMins,
        }),
      });

      const movie = await response.json();
      console.log("movie", movie);

      // Fetch the updated movie list after adding a movie
      fetch(`${apiUrl}/movie`)
        .then((res) => res.json())
        .then((res) => setMovies(res.data));
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <div className="App">
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} />

      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} />

      <h1>Create a movie</h1>
      <MovieForm handleSubmit={handleCreateMovie} />

      <h1>Movie list</h1>
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>Description: {movie.description}</p>
              <p>Runtime: {movie.runtimeMins}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
