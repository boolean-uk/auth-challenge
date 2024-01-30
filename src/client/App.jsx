import { useEffect, useState } from 'react';
import './App.css';
import MovieForm from './components/MovieForm';
import UserForm from './components/UserForm';

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

function App() {
  const [movies, setMovies] = useState([]);
  const [registerDetails, setRegisterDetails] = useState([])
  const [loginDetails, setLoginDetails] = useState([])


  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then(res => res.json())
      .then(res => setMovies(res.data));
  }, []);


  const handleRegister = async ({ username, password }) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    };

    try {
      const response = await fetch(`${apiUrl}/user/register`, options)

      if (response.ok) {
        const newUser = await response.json();
        console.log(newUser);
        setRegisterDetails('Registration successful')
      } else {
        setRegisterDetails('Registration failed')
      }
    } catch (error) {
      console.error(error);
      setRegisterDetails("An error occured during registration")
    }
  };


  const handleLogin = async ({ username, password }) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    }

    try {
      const response = await fetch(`${apiUrl}/user/login`, options)
      if (response.ok) {
        const data = await response.json()
        setLoginDetails('Login successful')
        localStorage.setItem('jwt token', data.token)
      } else {
        setLoginDetails('Login failed')
      }
    } catch (err) {
      console.error(error);
      setLoginDetails('An error occured during logging')
    }

  };

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {

  }

  return (
    <div className="App">
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} />
      <p>{registerDetails}</p>


      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} />
      <p>{loginDetails}</p>

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
