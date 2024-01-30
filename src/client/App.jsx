import { useEffect, useState } from 'react';
import './App.css';
import { LoginForm } from './pages/login/LoginForm';
import { MovieList } from './pages/home/MovieList';
import { RegisterForm } from './pages/register/RegisterForm';
import { MovieForm } from './pages/create-movie/CreateMovieForm';
import { Link, Route, Routes } from 'react-router-dom';
import { getMovies, getMyMovies } from './helpers/api-get';
import { MyMovieList } from './pages/my-list/MyMovieList';

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;


function App() {
  const [movies, setMovies] = useState(undefined)
  const [myMovies, setMyMovies] = useState([])

  const updateList = (list) => {
    setMovies(list)
  }
  const updateMyList = (list) => {
    setMyMovies(list)
  }

  useEffect(() => getMovies(setMovies), [])

  return (
    <div className="App">
      <aside>
        <nav>
          <ul>
            <li><Link to="">HOME</Link></li>
            <li><Link to="register">REGISTER</Link></li>
            <li><Link to="login">LOGIN</Link></li>
            <li><Link to="movie">MOVIES</Link></li>
            <li><Link to="myMovies">MY LIST</Link></li>
          </ul>
        </nav>
      </aside>
      <Routes>
        <Route path="" element={<MovieList apiUrl={ apiUrl } movies={movies} />}></Route>
        <Route path="register" element = {<RegisterForm apiUrl={ apiUrl }/>}/>
        <Route path="login" element = {<LoginForm apiUrl={ apiUrl }/>}/>
        <Route path="movie" element = {<MovieForm apiUrl={ apiUrl } getMovies={getMovies} updateList={updateList} updateMyList={updateMyList}/>}/>
        <Route path="myMovies" element = {<MyMovieList apiUrl={ apiUrl } myMovies={myMovies} setMyMovies={setMyMovies}/>}/>
      </Routes>
    </div>
  );
}

export default App;
