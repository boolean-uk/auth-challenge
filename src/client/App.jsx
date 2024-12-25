import { useEffect, useState } from "react";
import "./App.css";
import MovieForm from "./components/MovieForm";
import UserForm from "./components/UserForm";

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

function App() {
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${apiUrl}/movie`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch movies");
        }
        setMovies(data.data);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
        setErrorMessage("Failed to fetch movies.");
      }
    };
    fetchMovies();
  }, []);

  const clearMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

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
    clearMessages();
    try {
      const response = await fetch(`${apiUrl}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to register");
      }
      setSuccessMessage("User registered successfully!");
    } catch (error) {
      setErrorMessage("Registration failed: " + error.message);
    }
  };

  const handleLogin = async ({ username, password }) => {
    clearMessages();
    try {
      const response = await fetch(`${apiUrl}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to login");
      }
     localStorage.setItem("token", data.token)
     setSuccessMessage("User  logged in successfully !")
    } catch (error) {
      setErrorMessage("Login failed: " + error.message)
    }
  };

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    clearMessages();
    
    const token = localStorage.getItem("token");

    if(!token){
      setErrorMessage("You must logged in to create a movie")
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/movie`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
         },
        body: JSON.stringify({ title, description, runtimeMins }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create movie");
      }

      // Update the movie list
      setMovies((prevMovies) => [...prevMovies, data.data]);
      setSuccessMessage("Movie created successfully!");

    } catch (error) {
      // console.error("Create movie error:", error.message);
      setErrorMessage("Failed to create movie: " +  error.message)
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

      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}

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
