import { useEffect, useState } from 'react'
import './App.css'
import UserForm from './components/UserForm'
import MovieForm from './components/MovieForm'
import MovieLi from './components/MovieLi'

const port = import.meta.env.VITE_PORT
const apiUrl = `http://localhost:${port}`

function App() {
  const [movies, setMovies] = useState([])
  const [registerError, setRegisterError] = useState(null)
  const [loginError, setLoginError] = useState(null)
  const [createMovieError, setCreateMovieError] = useState(null)

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then(res => res.json())
      .then(res => setMovies(res.data))
  }, [])

  async function handleRegister(user) {
    const options = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json',
      },
    }

    const response = await fetch(apiUrl + '/user/register', options)

    if (response.status >= 400) {
      const errorText = await response.text()
      const error = JSON.parse(errorText)

      setRegisterError(error.error)

      return
    }

    setRegisterError(null)
  }

  async function handleLogin(user) {
    const options = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json',
      },
    }

    const response = await fetch(apiUrl + '/user/login', options)
    
    if (response.status >= 400) {
      const errorText = await response.text()
      const error = JSON.parse(errorText)

      setLoginError(error.error)

      return
    }

    setLoginError(null)

    const data = await response.json()
    localStorage.setItem("jwt", data.token)
  }

  async function handleCreateMovie(movie) {
    const options = {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      },
    }

    const response = await fetch(apiUrl + '/movie', options)

    if (response.status >= 400) {
      const errorText = await response.text()
      const error = JSON.parse(errorText)

      setCreateMovieError(error.error)

      return
    }

    setCreateMovieError(null)

    const data = await response.json()
    const newMovie = data.data

    setMovies([
      ...movies,
      newMovie
    ])
  }

  return (
    <div className='app'>
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} error={registerError} setError={setRegisterError} />

      <h2>Login</h2>
      <UserForm handleSubmit={handleLogin} error={loginError} setError={setLoginError} />

      <h2>Create a movie</h2>
      <MovieForm handleSubmit={handleCreateMovie} error={createMovieError} setError={setCreateMovieError} />

      <h2>Movie list</h2>
        <ul className='movie-ul'>
          {movies.map((movie, index) => {
            return <MovieLi key={index} movie={movie} />})
          }
        </ul>
    </div>
  )
}

export default App
