import { useEffect, useState } from 'react';
import './App.css';
import MovieForm from './components/MovieForm';
import UserForm from './components/UserForm';

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then(res => res.json())
      .then(res => setMovies(res.data));
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
    const createdRegister = await fetch(`${apiUrl}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    console.log(createdRegister);
  };

  const handleLogin = async ({ username, password }) => {
    const verifyLogin = await fetch(`${apiUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const logInToken = await verifyLogin.json();
    localStorage.setItem("token", JSON.stringify(logInToken));
  };

  

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    // Retrieve the token from local storage
    const authtoken = JSON.parse(localStorage.getItem("token"));
  
    try {
      // Send a request to create a new movie
      const moviesData = await fetch(`${apiUrl}/movie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add the authorization header with the token
          Authorization: `Bearer ${authtoken}`,
        },
        body: JSON.stringify({ title, description, runtimeMins }),
      });
  
      const data = await moviesData.json();
  
      if (moviesData.ok) {
        setMovies((prevMovies) => [...prevMovies, data.data]);
        console.log(data, authtoken);
        alert("Movie created successfully");
      } else {
        throw new Error(data.message || "Failed to create movie");
      }
    } catch (error) {
      console.error("An error occurred during movie creation:", error.message);
      alert("Failed to create movie");
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
        {movies.map(movie => {
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
