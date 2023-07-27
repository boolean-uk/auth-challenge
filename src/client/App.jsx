import { useState, useEffect } from 'react';
import './App.css';
import { Login, Register } from './components';

const apiUrl = 'http://localhost:4000';

const moviesState = {
  title: '',
  description: '',
  runtimeMins: 0,
}
function App() {
  const [token, setToken] = useState(localStorage.getItem('Token'))
  const [movies, setMovies] = useState(moviesState)
  const [movieList, setMovieList] = useState([])
  const [infiniteStopper, setInfiniteStopper] = useState(0)
  
  const handleMovies = (e) => {
    const {name} = e.target
    setMovies({...movies, [name]: e.target.value})
  }
  
  const createMovie = (e) => {
    e.preventDefault()
    const movieDetails = {
      title: movies.title,
      description: movies.description,
      runtimeMins: Number(movies.runtimeMins)
    }
    const options = {
      method: "post",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(movieDetails)
    }
    fetch(`${apiUrl}/movie`, options)
    .then(res => res.json())
    .then(() => {
      setInfiniteStopper(infiniteStopper + 1)
    })
    e.target.reset()
  }

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
    .then(res => res.json())
    .then(data => {
      setMovieList(data.allMovies)
    })
  }, [infiniteStopper])

  return (
    <div className="App">
      <Register apiUrl={apiUrl} />
      <Login setToken={setToken} apiUrl={apiUrl} />


      <h2>Create a movie</h2>
      <form onSubmit={createMovie}>
        <input type="text" placeholder='Title' name='title' onChange={handleMovies}/>
        <input type="text" placeholder='Description' name='description' onChange={handleMovies}/>
        <input type="number" placeholder='Runtime in Mins' pattern='[0-9]*' name='runtimeMins' onChange={handleMovies}/>
        <input type="submit" />
      </form>

      <h2>Movie List</h2>
      {
        movieList.map((movie, idx) => {
          return <div key={idx}>
            <h3>{movie.title}</h3>
            <p>Description: {movie.description}</p>
            <p>Runtime: {movie.runtimeMins}</p>
          </div>
        })
      }
    </div>
  );
}

export default App;