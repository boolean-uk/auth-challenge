import { useEffect, useState } from 'react'
import './App.css'
import MovieForm from './components/MovieForm'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import {useNavigate} from 'react-router-dom'
import Aside from './components/Aside'
import HomePage from './components/HomePage'

const port = import.meta.env.VITE_PORT
const apiUrl = `http://localhost:${port}`

function App() {
  const [movies, setMovies] = useState([])
  const [registerError, setRegisterError] = useState(null)
  const [loginError, setLoginError] = useState(null)
  const [createMovieError, setCreateMovieError] = useState(null)

  const navigate = useNavigate()

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

    navigate('/login')
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

    navigate('/movie-list')
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

      <Aside />

      <Routes>
        
        <Route 
          path='/'
          element={<HomePage />}        
        />

        <Route 
          path='/login'
          element={<LoginPage handleSubmit={handleLogin} error={loginError} setError={setLoginError}/>}
        />

        <Route 
          path='/register'
          element={<RegisterPage handleSubmit={handleRegister} error={registerError} setError={setRegisterError}/>}
        />

        <Route 
            path='/movie-list'
            element={<MovieForm handleSubmit={handleCreateMovie} error={createMovieError} setError={setCreateMovieError} movies={movies} setMovies={setMovies} apiUrl={apiUrl} />}
        />

      </Routes>
      
    </div>
  )
}

export default App
