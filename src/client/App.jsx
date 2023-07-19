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

  const register = async ({ username, password }) => {
    const res = await fetch(`${apiUrl}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    console.log("Registration complete")
  };

  const login = async ({ username, password }) => {
    const res = await fetch(`${apiUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await res.json();
    localStorage.setItem("accessToken", data.token);
    console.log("Login complete")
  };

  const createMovie = async ({ title, description, runtimeMins }) => {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${apiUrl}/movie`, {
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

    const movie = res.json();
    console.log('Added movie')

    setMovies([...movies, movie])
  };

  return (
    <div className="App">
      <h1>Register</h1>
      <UserForm handleSubmit={register} />
      <h1>Login</h1>
      <UserForm handleSubmit={login} />
      <h1>Create a movie</h1>
      <MovieForm handleSubmit={createMovie} />

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