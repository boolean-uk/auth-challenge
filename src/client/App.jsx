import { useEffect, useState } from "react";
import "./App.css";
import MovieForm from "./components/MovieForm";
import UserForm from "./components/UserForm";

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then((res) => res.json())
      .then((res) => setMovies(res.data));
  }, []);

  /**
   * HINTS!
   * 1. This handle___ functions below use async/await to handle promises, but the
   * useEffect above is using .then to handle them. Both are valid approaches, but
   * we should ideally use one or the other. Pick whichever you prefer.
   *
   * 2. The default method for the `fetch` API is to make a GET request. To make other
   * types of requests, we must provide an object as the second argument of `fetch`.
   * The values that you must provide are:
   * - method
   * - headers
   * - body (if needed)
   * For the "headers" property, you must state the content type of the body, i.e.:
   *   headers: {
   *     'Content-Type': 'application/json'
   *   }
   * */

  const handleRegister = async ({ username, password }) => {
    const data = { username, password };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    try {
      const registerUserData = await fetch(`${apiUrl}/user/register`, options);
      const reg = await registerUserData.json();
      console.log(reg);
      return;
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleLogin = async ({ username, password }) => {
    const data = {
      username,
      password,
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    try {
      const loginResponse = await fetch(`${apiUrl}/user/login`, options);
      const loginData = await loginResponse.json();
      console.log(loginData);
      const authToken = loginData.data;
      console.log(authToken);

      localStorage.setItem("token", authToken);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    const movieData = { title, description, runtimeMins };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(movieData),
    };

    try {
      const newMovieResponse = await fetch(`${apiUrl}/movie`, options);
      const newMovieData = await newMovieResponse.json();
      setMovies([...movies, newMovieData.data]);
    } catch (error) {
      console.error("Error while adding a new movie:", error);
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
