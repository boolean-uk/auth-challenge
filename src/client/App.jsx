import { useEffect, useState } from 'react';
import './App.css';
import MovieForm from './components/MovieForm';
import UserForm from './components/UserForm';

const apiUrl = 'http://localhost:4000';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then(res => res.json())
      .then(res => setMovies(res.data));
  }, []);

  const handleRegister = async ({ username, password }) => {
    fetch('http://localhost:4000/user/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then((data) => console.log(data))
  };

  const handleLogin = async ({ username, password }) => {
    fetch('http://localhost:4000/user/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then((data) => {
        console.log('LOGIN', data)
        localStorage.setItem('token', data.data)
      })
  };

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    fetch('http://localhost:4000/movie', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ title, description, runtimeMins })
    })
      .then(res => res.json())
      .then((data) => setMovies(data.token))
    // .then((data) => console.log(data))
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
      {Array.isArray(movies) && movies.length > 0  || movies !== undefined ? (
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
      ) : (
        <p>Empty movies list</p>
      )}
    </div>
  );
}

export default App;

