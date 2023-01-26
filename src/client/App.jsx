import { prisma } from "@prisma/client";
import { useEffect, useState } from "react";
import "./App.css";
import MovieForm from "./components/MovieForm";
import UserForm from "./components/UserForm";

const apiUrl = "http://localhost:4000";

function App() {
  const [token, setToken] = useState([]);
  const [movies, setMovies] = useState([]);
  const [regError, setRegError] = useState(undefined);
  const [regSuccess, setRegSuccess] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then((res) => res.json())
      .then((res) => setMovies(res.data));
  }, []);

  const handleRegister = async ({ username, password }) => {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    fetch(`${apiUrl}/user/register`, opts)
      .then((res) => {
        if (res.ok !== true) {
          throw Error(`The username ${username} is already taken!`);
        }
        setRegSuccess(true);
      })
      .then((data) => {})
      .catch((err) => {
        return setRegError(err.message);
      });
  };

  const handleLogin = async ({ username, password }) => {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    fetch(`${apiUrl}/user/login`, opts)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.accessToken);
        setToken(localStorage.token);
        setLoggedInUser(data.user);
      });
  };

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        runtimeMins,
        userId: loggedInUser.id,
      }),
    };
    fetch(`${apiUrl}/movie`, opts)
      .then((res) => res.json())
      .then((data) => {
        const movie = { ...data.data };
        const updatedMovies = [...movies, movie];
        setMovies(updatedMovies);
      });
  };

  return (
    <div className="App">
      <h1>Register</h1>
      <UserForm
        handleSubmit={handleRegister}
        regError={regError}
        setRegError={setRegError}
        regSuccess={regSuccess}
      />
      {regError !== undefined && <>{regError}</>}

      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} setRegError={setRegError} />

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
