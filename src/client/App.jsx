import { useEffect, useState } from 'react';
import './App.css';
import MovieForm from './components/MovieForm';
import UserForm from './components/UserForm';
// import RegisterUser from './components/RegisterUser.jsx';
import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LogInUser';

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;


function App() {
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([])

    useEffect(() => {
    const fetchMovies = async () => {
      // try {
        const res = await fetch(`${apiUrl}/movies`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setMovies(data.allMovies);
      // } catch (error) {
      //   console.error('Error fetching movies:', error);
      // }
    };
    fetchMovies();
  }, []);

  return (
    <div className="App">
      <h1>Register</h1>
      <RegisterUser />

      <h1>Login</h1>
      <LoginUser />

      <h1>Create a movie</h1>
      <MovieForm />

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
