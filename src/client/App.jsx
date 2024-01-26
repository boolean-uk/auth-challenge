import { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MovieForm from './components/MovieForm';
import './App.css';

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

function App() {
  const [movies, setMovies] = useState([]);
  const [createMovieMessage, setCreateMovieMessage] = useState('')
  const [deleteAllMoviesMessage, setDeleteAllMoviesMessage] = useState('')

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then(res => res.json())
      .then(res => setMovies(res.data));
  }, []);

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
      const { movie, message } = data
      setMovies([...movies, movie])
      setCreateMovieMessage(message)
    }
    catch (err) {
      setCreateMovieMessage(err.response.data.error)
    }
  }

  const deleteAllMovies = async () => {
    const token = localStorage.getItem('token')

    try {
      const { data } = await axios.delete(`${apiUrl}/movie`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      setMovies([])
      setDeleteAllMoviesMessage(data.message)
    }
    catch (err) {
      setDeleteAllMoviesMessage(err.response.data.eror)
    }
  }

  return (
    <div className="App">

      <Home apiUrl={apiUrl} />

      <h1>Create a movie</h1>
      <MovieForm handleSubmit={handleCreateMovie} />
      {createMovieMessage && <p>{createMovieMessage}</p>}

      <h1>Movie list</h1>
      <button className='delete-movies-btn' onClick={deleteAllMovies}>Delete all Movies</button>
      {deleteAllMoviesMessage && <p>{deleteAllMoviesMessage}</p>}

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

      <Routes>
        {/* <Route
          path='/'
          element={
            
          }
        >

        </Route> */}
        <Route
          path='/movie-list'
          element={<div>hi</div>}
        >
        </Route>
      </Routes>
    </div>
  );
}

export default App;
