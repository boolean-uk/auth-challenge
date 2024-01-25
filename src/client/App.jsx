import { useEffect, useState } from 'react';
import './App.css';
import MovieForm from './components/MovieForm';
import UserForm from './components/UserForm';
import axios from 'axios';

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

function App() {
  const [movies, setMovies] = useState([]);
  const [registerMessage, setRegisterMessage] = useState('')
  const [loginMessage, setLoginMessage] = useState('')

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
      setRegisterMessage(data.message)
    }
    catch (err) {
      setRegisterMessage(err.response.data.error)
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
      const { token, message } = data
      localStorage.setItem('token', token)
      setLoginMessage(message)
      console.log(data)
    }
    catch (err) {
      console.log(err.response)
      setLoginMessage(err.response.data.error)
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
      {registerMessage && <p>{registerMessage}</p>}

      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} />
      {loginMessage && <p>{loginMessage}</p>}

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
