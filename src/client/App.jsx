import './App.css'
import { useState, useEffect } from 'react'

const apiUrl = 'http://localhost:4000'
function App() {
  const [user, setUser] = useState({ username: '', password: '' })
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    runtimeMins: 0
  })
  const [movies, setMovies] = useState([])
  const [registerResponse, setRegisterResponse] = useState('')
  const [loginResponse, setLoginResponse] = useState('')
  const [movieResponse, setMovieResponse] = useState('')
  const [token, setToken] = useState('')

  const register = async (e) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }
    fetch(`${apiUrl}/user/register`, options)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        setRegisterResponse(`${user.username} has been registered`)
      })
  }
  const login = async (e) => {
    e.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }
    fetch(`${apiUrl}/user/login`, options)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        setLoginResponse(`${user.username} has been logged in ${data.token}`)
        localStorage.setItem('Token', data.token)
        setToken(data.token)
        console.log(setLoginResponse)
      })
  }
  const handleChange = (e) => {
    const { value, name } = e.target

    setUser({
      ...user,
      [name]: value
    })
  }
  const handleMovieChange = (e) => {
    const { value, name } = e.target
    const updatedValue = name === 'runtimeMins' ? parseInt(value) || '' : value
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: updatedValue
    }))
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('Token')
    if (storedToken) {
      setToken(storedToken)
    }

    const fetchMovies = async () => {
      try {
        const response = await fetch(`${apiUrl}/movie`)
        const data = await response.json()
        setMovies(data.movies)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchMovies()
  }, [])

  const createMovie = async (e) => {
    e.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    }
    fetch(`${apiUrl}/movie`, options)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        setMovieResponse(`${movie.title} has been created`)
      })
  }
  return (
    <div className="App">
      <div className="register">
        <h2>REGISTER</h2>
        <form onSubmit={register}>
          <input
            placeholder="Username"
            onChange={handleChange}
            type="text"
            name="username"
            value={user.username}
          ></input>
          <br></br>

          <input
            placeholder="Password"
            onChange={handleChange}
            type="password"
            name="password"
            value={user.password}
          ></input>
          <br></br>
          <button className="button">Register</button>
          {registerResponse && <p>{registerResponse}</p>}
        </form>
      </div>
      <div className="login">
        <h2>LOGIN</h2>
        <form onSubmit={login}>
          <input
            placeholder="Username"
            type="text"
            name="username"
            onChange={handleChange}
            value={user.username}
          ></input>
          <br></br>
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleChange}
            value={user.password}
          ></input>
          <br></br>
          <button className="button">Login</button>
          {loginResponse && <p>{loginResponse}</p>}
        </form>
      </div>

      <div className={`movie ${token ? '' : 'hidden'}`}>
        {token && <h2>ADD A MOVIE</h2>}
        {token && (
          <form onSubmit={createMovie}>
            <input
              placeholder="Title"
              type="text"
              name="title"
              onChange={handleMovieChange}
              value={movie.title}
            ></input>
            <br></br>
            <input
              placeholder="Description"
              type="text"
              name="description"
              onChange={handleMovieChange}
              value={movie.description}
            ></input>
            <br></br>
            <input
              placeholder="Duration"
              type="number"
              name="runtimeMins"
              onChange={handleMovieChange}
              value={movie.runtimeMins}
            ></input>
            <br></br>
            <button className="button">Create</button>
            {movieResponse && <p>{movieResponse}</p>}
          </form>
        )}
      </div>

      {token && (
        <div>
          <h1>LIST OF MOVIES</h1>
          {movies.map((movie) => (
            <div key={movie.id}>
              <h3>{movie.title}</h3>
              <p>Description: {movie.description}</p>
              <p>Runtime: {movie.runtimeMins} minutes</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
