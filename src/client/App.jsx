import React, { useState, useEffect } from 'react';

function App() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const response = await fetch('http://localhost:4000/movie');
    const data = await response.json();
    setMovies(data.data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;

    const response = await fetch('http://localhost:4000/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log('Registered user:', data);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;

    const response = await fetch('http://localhost:4000/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    localStorage.setItem('token', data.token);
    console.log('Logged in user:', data);
  };

  const handleCreateMovie = async (event) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const description = event.target.elements.description.value;
    const runtimeMins = parseInt(event.target.elements.runtimeMins.value, 10);

    const response = await fetch('http://localhost:4000/movie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ title, description, runtimeMins }),
    });

    const data = await response.json();
    console.log('Created movie:', data);
    fetchMovies();
  };

  return (
    <div>
      <div>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <label>Username</label>
          <input type="text" name="username" />
          <label>Password</label>
          <input type="password" name="password" />
          <button type="submit">Submit</button>
        </form>
      </div>
      
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input type="text" name="username" />
          <label>Password</label>
          <input type="password" name="password" />
          <button type="submit">Submit</button>
        </form>
      </div>

      <div>
        <h1>Create a Movie</h1>
        <form onSubmit={handleCreateMovie}>
          <label>Title</label>
          <input type="text" name="title" />
          <label>Description</label>
          <input type="text" name="description" />
          <label>Runtime (mins)</label>
          <input type="number" name="runtimeMins" />
          <button type="submit">Submit</button>
        </form>
      </div>

      <div>
        <h1>Movie List</h1>
        {movies.map((movie, index) => (
          <div key={index}>
            <h2>{movie.title}</h2>
            <p>Description: {movie.description}</p>
            <p>Runtime: {movie.runtimeMins}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
