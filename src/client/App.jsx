
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

  const handleRegister = async ({ username, password }) => {
    try {
      const response = await fetch(`${apiUrl}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      const responseData = await response.json();
      console.log("Registration successful:", responseData);
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  const handleLogin = async ({ username, password }) => {
    try {
      const data = { username, password };
  
      const response = await fetch(`${apiUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const { data: token } = await response.json();
  
        localStorage.setItem("token", token);
        console.log("Login successful. Token:", token);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.error("token not found. Please log in.");
        return;
      }
  
      const response = await fetch(`${apiUrl}/movie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, runtimeMins }),
      });
      const data = await response.json();

      if (response.ok) {
  
        setMovies((prevMovies) => [...prevMovies, data.data]);
      } else {
        console.error("Failed to create the movie");
      }
    } catch (error) {
      console.error("An error occurred while creating the movie:", error);
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
