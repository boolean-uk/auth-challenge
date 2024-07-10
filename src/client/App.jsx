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
      .then(res => setMovies(res.data))

  }, []);


  const handleRegister = async ({ username, password }) => {
    const data = { username, password }

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }

    localStorage.removeItem("token")
    const registerUserData = await fetch(`${apiUrl}/user/register`, options)
    const registeredUser = await registerUserData.json()
    return alert(registeredUser.message)
  };


  const handleLogin = async ({ username, password }) => {
    const data = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }

    const userData = await fetch(`${apiUrl}/user/login`, options)
    const newLogin = await userData.json()
    const userToken = newLogin.token

    localStorage.setItem("token", userToken)
    return alert(newLogin.message)

  };


  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    const data = { title, description, runtimeMins }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    }

    const newMovieData = await fetch(`${apiUrl}/movie`, options)
    const newMovie = await newMovieData.json()

    if (newMovie.data) {
      setMovies([...movies, newMovie.data])
    }

    return alert(newMovie.message)
  }

  const logout = () => {
    localStorage.removeItem("token")
    return alert("User logged out")
  }


  return (
    <div className="App">
      <button className="logout" onClick={logout}>Logout</button>
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
