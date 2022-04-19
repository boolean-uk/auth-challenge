import { useEffect, useState } from 'react';
import './App.css';
import MovieForm from './components/MovieForm';
import UserForm from './components/UserForm';

const apiUrl = 'http://localhost:4000';
const headers = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  }
}

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then(res => res.json())
      .then(res => setMovies(res.data));
  }, []);

  const handleRegister = async user => {
    fetch(`${apiUrl}/user/register`, {
      ...headers,
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      if (json.error) {
        window.alert(`${json.error}!`)
        return
      }
      if (json.data.username) {
        window.alert(`${json.data.username} registered!`)
      }
    })
  };

  const handleLogin = async (user) => {
    fetch(`${apiUrl}/user/login`, {
      ...headers,
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      if (json.error) {
        window.alert(`${json.error}!`)
        return
      }
      if (json.data) {
        localStorage.setItem('token',json.data)
        window.alert(`${json.data} token!`)
      }
    })
  };
  
  const handleCreateMovie = async (movie) => {
    let headersWithAuth = headers
    headersWithAuth.headers.authorization = await localStorage.getItem('token')
    console.log(headersWithAuth)
    await fetch(`${apiUrl}/movie`, {
      ...headersWithAuth,
      body: JSON.stringify(movie)
    })
    await fetch(`${apiUrl}/movie`)
    .then(res => res.json())
    .then(json => setMovies(movies => json.data))
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