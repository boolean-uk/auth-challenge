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
    try {
      const response = await fetch(`${apiUrl}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error('Registration failed');
      }
  
      const data = await response.json();
      console.log('User registered:', data);
      // You might want to automatically log in the user or show a success message
    } catch (error) {
      console.error('Registration error:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const handleLogin = async ({ username, password }) => {
    try {
      const response = await fetch(`${apiUrl}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const { data: token } = await response.json();
      
      // Save the token in local storage
      localStorage.setItem('token', token);
  
      console.log('User logged in successfully');
      // You might want to update the app state to reflect that the user is logged in
    } catch (error) {
      console.error('Login error:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };
  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please login first.');
      }
  
      const response = await fetch(`${apiUrl}/movie`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, description, runtimeMins }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create movie');
      }
  
      const { data: newMovie } = await response.json();
      
      // Update the movies state to include the new movie
      setMovies(prevMovies => [...prevMovies, newMovie]);
  
      console.log('Movie created successfully');
    } catch (error) {
      console.error('Create movie error:', error);
      // Handle the error (e.g., show an error message to the user)
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
