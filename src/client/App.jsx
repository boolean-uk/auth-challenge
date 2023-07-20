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
    try {
      const response = await fetch(`${apiUrl}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
  
      if (response.status === 200) {
        alert('User registered successfully!');
      } else if (response.status === 400) {
        const errorData = await response.json();
        if (errorData.error === 'Username already exists.') {
          alert('An account with the same username already exists.');
        } else {
          alert(`Error: ${errorData.error}`);
        }
      } else {
        alert('Error occurred.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Error occurred.');
    }
  };  


  const handleLogin = async ({ username, password }) => {
    try {
      const response = await fetch(`${apiUrl}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      const data = await response.json();
      if (response.status != 200) {
        throw new Error (data.error)
      }
      const token = data.data
      localStorage.setItem('token', token);
      alert('User logged in successfully');
    } catch (error) {
      console.error('Error ', error);
      alert(`Error occurred ${error}`);
  
    }
  };

  
  const handleCreateMovie = ({ title, description, runtimeMins }) => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      alert('Please log in before creating a movie.');
      return;
    }
  
    fetch(`${apiUrl}/movie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: title,
        description: description,
        runtimeMins: runtimeMins
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error occurred while creating the movie.');
        }
      })
      .then(responseData => {
        const createdMovie = responseData.data; 
        setMovies([...movies, createdMovie]); 
        alert('Movie created successfully!');
      })
      .catch(error => {
        console.error('Error occured during movie creation:', error);
        alert(error.message);
      });
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