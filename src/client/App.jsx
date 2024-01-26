import { useEffect, useState } from 'react';
import './App.css';
import { LoginForm } from './components/LoginForm';
import { MovieList } from './components/MovieList';
import { RegisterForm } from './components/RegisterForm';
import { MovieForm } from './components/CreateMovieForm';

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

function App() {
  const [movies, setMovies] = useState(undefined)

  const getMovies = () => {
      const options = {
          method: "GET",
          headers: {"content-type":"application/json"}
      }
      fetch(`${apiUrl}/movie`, options)
      .then(res => res.json())
      .then(setMovies)
  }

  useEffect(getMovies, [])

  return (
    <div className="App">
      <RegisterForm apiUrl={ apiUrl }/>
      <LoginForm apiUrl={ apiUrl } />
      <MovieForm apiUrl={ apiUrl } getMovies={getMovies}/>
      <MovieList apiUrl={ apiUrl } movies={movies}/>
    </div>
  );
}

export default App;
