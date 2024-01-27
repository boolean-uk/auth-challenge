import { useEffect, useState } from 'react';
import './App.css';
import MovieForm from './components/MovieForm';
import UserForm from './components/UserForm';

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then(res => res.json())
      .then(res => setMovies(res.data));
  }, []);

  /**
   * HINTS!
   * 1. This handle___ functions below use async/await to handle promises, but the
   * useEffect above is using .then to handle them. Both are valid approaches, but
   * we should ideally use one or the other. Pick whichever you prefer.
   *
   * 2. The default method for the `fetch` API is to make a GET request. To make other
   * types of requests, we must provide an object as the second argument of `fetch`.
   * The values that you must provide are:
   * - method
   * - headers
   * - body (if needed)
   * For the "headers" property, you must state the content type of the body, i.e.:
   *   headers: {
   *     'Content-Type': 'application/json'
   *   }
   * */



  const handleRegister = async ({ username, password }) => {

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username,password}),
    };

        try {
            const response = await fetch(`${apiUrl}/user/register`, options);
    
            if (response.ok) {
                const newUser = await response.json(); 
                console.log('Here is the user', newUser);
            } else {
                console.log('Error occurred while trying to post:', response.status, response.statusText);
            }
        } catch (err) {
            console.error('Error during fetch:', err);
        }

  };

  const handleLogin = async ({ username, password }) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username,password}),
    };

    const logUser = await fetch(`${apiUrl}/user/login`, options);
    if(logUser.ok){
      const userToken = await logUser.json()
      localStorage.setItem('newToken', JSON.stringify(userToken))
    }else{
      return 'username or password not found'
    }
  };

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    const authToken = localStorage.getItem('newToken')

    const options = {
      method: 'POST',
      headers:{
        'Authorization': `Bearer${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description, runtimeMins }),
    }

    const data = await fetch(`${apiUrl}/movie`, options);
    if(data){
      const newMovie = await data.json()
      setMovies(newMovie)
    }

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
