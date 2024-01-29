import { useEffect, useState } from 'react';
import './App.css';
import { LoginForm } from './components/LoginForm';
import { MovieList } from './components/MovieList';
import { RegisterForm } from './components/RegisterForm';
import { MovieForm } from './components/CreateMovieForm';
import { Link, Route, Routes } from 'react-router-dom';

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
      <aside>
        <nav>
          <ul>
            <li><Link to="register">REGISTER</Link></li>
            <li><Link to="login">LOGIN</Link></li>
            <li><Link to="movie">MOVIES</Link></li>
          </ul>
        </nav>
      </aside>
      <Routes>
        <Route path="register" element = {<RegisterForm apiUrl={ apiUrl }/>}/>
        <Route path="login" element = {<LoginForm apiUrl={ apiUrl }/>}/>
        <Route path="movie" element = {<MovieForm apiUrl={ apiUrl } getMovies={getMovies}/>}/>
      </Routes>
      <MovieList apiUrl={ apiUrl } movies={movies}/>
    </div>
  );
}

export default App;
