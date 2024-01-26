import { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import MovieForm from "./components/MovieForm";
import UserForm from "./components/UserForm";

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then((res) => res.json())
      .then((res) => setMovies(res.data));
  }, []);

  const handleRegister = async ({ username, password }) => {
    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };
    const response = await fetch(`${apiUrl}/user/register`, option);
    if (response.ok) {
      const result = await response.json();
      localStorage.clear();
      setError(null);
      console.log(result.data);
    } else {
      const result = await response.json();
      setError(result.error);
      console.log(result.error);
    }
  };

  const handleLogin = async ({ username, password }) => {
    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };
    const response = await fetch(`${apiUrl}/user/login`, option);
    if (response.ok) {
      const result = await response.json();
      setError(null);
      localStorage.setItem("userToken", result.data.token);
      localStorage.removeItem("user");
    } else {
      const result = await response.json();
      setError(result.error);
      console.log(result.error);
    }
  };
  console.log(movies);

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
      setError("User token is missing");
    }

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ title, description, runtimeMins }),
    };

    const response = await fetch(`${apiUrl}/movie`, option);
    if (response.ok) {
      const result = await response.json();
      console.log(result.data);
      setMovies([...movies, result.data]);
    } else {
      const result = await response.json();
      setError(result.error);
    }
  };

  return (
    <div className="App">
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} error={error} />

      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} error={error} />

      <h1>Create a movie</h1>
      <MovieForm handleSubmit={handleCreateMovie} error={error} />

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
