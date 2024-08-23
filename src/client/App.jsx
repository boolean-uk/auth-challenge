import { useEffect, useState } from "react";
import "./App.css";
import MovieForm from "./components/MovieForm";
import UserForm from "./components/UserForm";
// import { register, login } from "../server/controllers/user";

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
    try {
      if (!username || !password) {
        throw new Error("Username and password required");
      }
      const response = await fetch("http://localhost:4060/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error("Registration failed!");
      }
      const createdUser = await response.json();

      return { success: true, data: createdUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleLogin = async ({ username, password }) => {
    try {
      if (!username || !password) {
        throw new Error("Username and password required");
      }
      const response = await fetch("http://localhost:4060/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Login failed");
      }

      const token = responseData.data;
      localStorage.setItem("authToken", token);
      console.log(localStorage.getItem("authToken"));

      return { success: true, data: "Logged in!" };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Please log in!");
      }

      const response = await fetch("http://localhost:4060/movie/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, runtimeMins }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create movie.");
      }

      const { data: createdMovie } = await response.json(); // Extract the created movie from the response
      setMovies((prevMovies) => [...prevMovies, createdMovie]);

      return { success: true, data: response };
    } catch (error) {
      console.log(error);
      return { success: false, error: error.message };
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
