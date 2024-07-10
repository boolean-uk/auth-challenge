import { useEffect, useState } from 'react'
import './App.css'
import UserForm from './components/UserForm'
import MovieForm from './components/MovieForm'

const port = import.meta.env.VITE_PORT
const apiUrl = `http://localhost:${port}`

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then(res => res.json())
      .then(res => setMovies(res.data));
  }, []);

  return (
    <div className='app'>
      <h1>Register</h1>
      <UserForm />

      <h2>Login</h2>
      <UserForm />

      <h2>Create a movie</h2>
      <MovieForm />
    </div>
  )
}

export default App
