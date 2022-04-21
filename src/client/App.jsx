import { useEffect, useState } from 'react';
import './App.css';
import MovieForm from './components/MovieForm';
import UserForm from './components/UserForm';

const apiUrl = 'http://localhost:4000';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then(res => res.json())
      .then(res => setMovies(res.data));
  }, []);

  const handleRegister = async ({ username, password }) => {
    const options = {
      method: "POST",
      headers: {  
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    }

    fetch('http://localhost:4000/user/register', options)
    .then(res => res.json())
    .then(json =>{
      console.log('created new user:', json)
    })
  };

  const handleLogin = async ({ username, password }) => {

    const options = {
      method: "POST",
      headers: {  
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    }

    fetch('http://localhost:4000/user/login', options)
    .then(res => res.json())
    .then(json =>{
      console.log('login:', json.data)
      localStorage.setItem('jwt', json.data)
    })
  };
  



  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    const options = {
      method: "POST",
      headers: {  
        'Authorization': 'Bearer' + localStorage.getItem('jwt'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        runtimeMins
      })
    }

    fetch('http://localhost:4000/movie', options)
    .then(res => res.json())
    .then(json =>{
      console.log('movie:', json)

      setMovies([json.data, ...movies])
    })
  }
//   1. Send a request to the `/movie` route to create a new movie using the parameters provided in the function.
//     1. You must add an appropriate auth header to the request
//     2. The value of the header must be the token obtained during login, which should be available in local storage
// 2. Update the `movies` state to include the newly created movie. The list of movies must re-render without requiring a page refresh.


  return (
    <div className="App">
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