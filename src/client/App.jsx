import './App.css';
import { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import MovieForm from './components/MovieForm';
import io from 'socket.io-client';

const apiUrl = 'http://localhost:4000';
const socket = io(apiUrl)

function App() {
  const [movies, setMovies] = useState([]);
  const [registerMessage, setRegisterMessage] = useState(null)
  const [loginMessage, setLoginMessage] = useState(null)

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then(res => res.json())
      .then(data => setMovies(data.movies))
      .catch(error => {
        console.error('Error fetching movies:', error)
      })
  }, [])

  const handleRegister = async ({ username, password }) => {
    const user = {username, password}
    const newUser = JSON.stringify(user)

    const options ={
      method: 'POST',
      body: newUser,
      headers: {
        'Content-Type': 'application/json',
      },
    }

    fetch(`${apiUrl}/user/register`, options)
      .then((res) => res.json())
      .then((data) => {
        setLoginMessage(null)
        if (data.error) {
          setRegisterMessage(data.error)
        } else {
          setRegisterMessage(`User "${username}" successfully registered`)
          console.log(`User "${username}" successfully registered`)
        }
      })
  }

  const handleLogin = async ({ username, password }) => {
    const user = {username, password}
    const loginUser = JSON.stringify(user)

    const options = {
      method: 'POST',
      body: loginUser,
      headers: {
        'Content-Type': 'application/json',
      },
    }

    fetch(`${apiUrl}/user/login`, options)
      .then((res) => res.json())
      .then((data) => {
        setRegisterMessage(null)
        if (data.error) {
          setLoginMessage(data.error)
        } else {
          setLoginMessage(`Welcome back ${username}`)
          console.log(`User "${username}" logged in successfully`)
          localStorage.setItem('token', data.token)
        }
      })
  }

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    const movie = { title, description, runtimeMins }
    const jsonMovie = JSON.stringify(movie)
    const token = localStorage.getItem('token')

    const options = {
      method: 'POST',
      body: jsonMovie,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }

    fetch(`${apiUrl}/movie`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setMovies(prevMovies => [...prevMovies, data.data])
      })
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
      <h1>Movie List</h1>
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