import { useEffect, useState } from 'react';
import './App.css';
import MovieForm from './components/MovieForm';
import UserForm from './components/UserForm';

const apiUrl = 'http://localhost:4000';

function App () {
  const [movies, setMovies] = useState([]);
  const [regInfo, setInfo] = useState({});

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
    }
    fetch('http://localhost:4000/user/register', options)
      .then(res => res.json())
      .then(res => {
        setInfo(res.data)
      })
      .catch(() => { setInfo('Server Error') })
  };
  console.log('my fetch response', regInfo)

  const handleLogin = async ({ username, password }) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    }
    fetch('http://localhost:4000/user/login', options)
      .then(res => res.json())
      .then(res => {
        localStorage.setItem('jwt', res.data)
        console.log('loged in', localStorage.getItem('jwt'))
      })
      .catch(err => console.log(err))
  };
  console.log('jwt', localStorage.getItem('jwt'))

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    console.log('createMovie', { title, description, runtimeMins })
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({ title, description, runtimeMins })
    }

    fetch('http://localhost:4000/movie', options)
      .then(res => res.json())
      .then(res => {
        setMovies([...movies, res.data])
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <h1>Register</h1>
      <UserForm handleSubmit={ handleRegister } />

      <h1>Login</h1>
      <UserForm handleSubmit={ handleLogin } />

      <h1>Create a movie</h1>
      <MovieForm handleSubmit={ handleCreateMovie } />

      <h1>Movie list</h1>
      <ul>
        { movies.map(movie => {
          return (
            <li key={ movie.id }>
              <h3>{ movie.title }</h3>
              <p>Description: { movie.description }</p>
              <p>Runtime: { movie.runtimeMins }</p>
            </li>
          );
        }) }
      </ul>
    </div>
  );
}

export default App;