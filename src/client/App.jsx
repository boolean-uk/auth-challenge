import { useEffect, useState } from "react";
import "./App.css";
import MovieForm from "./components/MovieForm";
import UserForm from "./components/UserForm";

const apiUrl = "http://localhost:4000";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    fetch(`${apiUrl}/movie`, options)
      .then((res) => res.json())
      .then((res) => setMovies(res.data));
  }, []);

  const handleRegister = async ({ username, password }) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    fetch(`${apiUrl}/user/register`, options)
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  const handleLogin = async ({ username, password }) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    fetch(`${apiUrl}/user/login`, options)
      .then((res) => res.json())
      .then((json) => {
        setMovies(json.movies)
        localStorage.setItem("token", json.data);
      });
  };

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    const token = localStorage.getItem("token");

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        runtimeMins: runtimeMins,
      }),
    };
    fetch(`${apiUrl}/movie`, options)
      .then((res) => res.json())
      .then((json) => {
        const newMovie = json.data;
        setMovies([...movies, newMovie]);
        console.log({movieAdded: newMovie});
      });
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
