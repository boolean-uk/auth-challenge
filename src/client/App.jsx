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
      //Send a post request
      method: 'POST',
      //Set the headers
      headers: {
        'content-type' :'application/json'
      },
      //Set the body of the request - we want to send
      //our data in JSON format, so we use JSON.stringify
      body: JSON.stringify({
        username: username,
        password: password
      })
    }

    fetch(apiUrl + "/user/register", options)
      .then(res => res.json())
      .then(json => (console.log('Registered user:' + json.data.username)))
      .catch((error) => {
        //If the server is unavailable, then show an error
        //to the user
        console.log(error)
      })
    
  };

  const handleLogin = async ({ username, password }) => {
    const options = {
      //Send a post request
      method: 'POST',
      //Set the headers
      headers: {
        'content-type' :'application/json'
      },
      //Set the body of the request - we want to send
      //our data in JSON format, so we use JSON.stringify
      body: JSON.stringify({
        username: username,
        password: password,
      })
    }

    fetch(apiUrl + "/user/login", options)
      .then(res => res.json())
      .then(json => { (console.log('User Logged In:' + json.data))
        localStorage.setItem('jwt', json.data)
      })
      
    
  };
  
  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    
  }

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