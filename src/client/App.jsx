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
      .then((res) => res.json())
      .then((res) => setMovies(res.data));
  }, []);

  const handleRegister = async ({ username, password }) => {
    try {
      const response = await fetch(`http://localhost:4000/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registration completed", data);
        // You can update the App state or redirect user to a new page here
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleLogin = async ({ username, password }) => {
    try {
      const response = await fetch(`http://localhost:4000/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful", data);
        localStorage.setItem("token", data.token);
        console.log("User logged in:", username, localStorage.getItem("token"));
      } else {
        throw new Error(data.message || "Login unsuccessful");
      }
    } catch (error) {
      console.error("An error occurred during the login process:", error.message);
    }
  };

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token has been found');
      }

      const response = await fetch(`${apiUrl}/movie`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, description, runtimeMins }),
      });

      const data = await response.json();

      if (response.ok) {
        setMovies(prevMovies => [...prevMovies, data.data]);
        console.log(data, token)
      } else {
        throw new Error(data.message || 'Failed to create movie');
      }
    } catch (error) {
      console.error('An error occurred during movie creation:', error.message);
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
