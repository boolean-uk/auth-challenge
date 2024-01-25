import { useEffect, useState } from 'react';
import './App.css';
import MovieForm from './components/MovieForm';
import UserForm from './components/UserForm';
import axios from 'axios';

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then(res => res.json())
      .then(res => setMovies(res.data));
  }, []);

  const handleRegister = async ({ username, password }) => {
    try {
      const { data } = await axios.post(`${apiUrl}/user/register`, {
        username,
        password
      }, {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      console.log(data.data)
    }
    catch (err) {
      console.log(err.response.data.error)
    }
  };

  const handleLogin = async ({ username, password }) => {
    try {
      const { data } = await axios.post(`${apiUrl}/user/login`, {
        username,
        password
      }, {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      localStorage.setItem('token', data.token)
      console.log(data.token)
    }
    catch (err) {
      console.log(err.response.data)
    }
  };

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    const token = localStorage.getItem('token')

    try {
      const { data } = await axios.post(`${apiUrl}/movie`, {
        title,
        description,
        runtimeMins
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      )
      const { movie } = data
      setMovies([...movies, movie])
    }
    catch (err) {
      console.log(err)
    }
  }

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
