import { useEffect, useState } from "react";
import "./App.css";
import api from "../server/api/axios.js";
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

  const [registerMessage, setRegisterMessage] = useState("");

  const handleRegister = async ({ username, password }) => {
    try {
      const res = await api.post("/user/register", { username, password });

      setRegisterMessage("Registration Successful");
    } catch (e) {
      console.log(e.message);
      setRegisterMessage(e.response.data.error ?? "Registration Failed");
    }
  };

  const [loginMessage, setLoginMessage] = useState("");

  const handleLogin = async ({ username, password }) => {
    try {
      const res = await api.post("/user/login", { username, password });

      localStorage.setItem("user_login_token", res.data.data);
      setLoginMessage("Login Successful");
    } catch (e) {
      console.log(e.message);
      setLoginMessage(e.response.data.error ?? "Login Failed");
    }
  };

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
    <div className="App">
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} />
      {registerMessage && <p>{registerMessage}</p>}

      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} />
      {loginMessage && <p>{loginMessage}</p>}

      <h1>Create a movie</h1>
      <MovieForm handleSubmit={handleCreateMovie} />
      {movieMessage && <p>{movieMessage}</p>}

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
