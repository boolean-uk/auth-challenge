import { useEffect, useState } from 'react';
import './App.css';
import MovieForm from './components/MovieForm';
import UserForm from './components/UserForm';

const apiUrl = 'http://localhost:4000';
const jwtSecret = 'mysecret';

function App() {
  const [movies, setMovies] = useState([]);
  const [token, setToken] = useState();
  console.log('setToken', token); 

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then(res => res.json())
      .then(res => setMovies(res.data));
  }, []);
  
  useEffect(() => {
    fetchMovies();
  }, []);

  const handleRegister = async ({ username, password }) => {
    try {
      const response = await fetch(`${apiUrl}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (response.ok) {
        console.log('User created successfully');
        
      } else {
        console.error('User creation failed');
        
      }
    } catch (error) {
      console.error(error);
      
    }
  };
  
  const handleLogin = async ({ username, password }) => {
    try {
      const response = await fetch(`${apiUrl}/user/login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if(response.ok){
        const data = await response.json();
        const receivedToken = data;
        setToken(receivedToken); 
        console.log('User logged in', receivedToken);
        
      }
      else{
        console.log('Failed to login')
      }
            
    } catch (error) {
      
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${apiUrl}/movie`);
      if (response.ok) {
        const data = await response.json();
        setMovies(data.data);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };
  
  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    try {
      if (!token) {
        console.error('No valid token found.');
        return;
      };
            
      const response = await fetch(`${apiUrl}/movie`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.data}`,
        },
        
        body: JSON.stringify({ title, description, runtimeMins }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Movie created successfully:', data);
        fetchMovies();
      } else {
        const errorData = await response.json();
        console.error('Movie creation failed:', errorData.error);
      }
    } catch (error) {
      console.error('Error occurred during movie creation:', error);
    }
  };

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