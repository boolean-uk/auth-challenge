import { useEffect, useState } from 'react'
import './App.css'
import MovieForm from './components/MovieForm'
import UserForm from './components/UserForm'

const apiUrl = 'http://localhost:4000'

function App() {
  const [movies, setMovies] = useState([])
  const [registerNewUser, setregisterNewUser] = useState('')
  const [newNotification, setNewNotification] = useState('')
  const [loginResponse, setLoginResponse] = useState('')

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then((res) => res.json())
      .then((res) => setMovies(res.data))
  }, [])

  const handleRegister = async ({ username, password }) => {
    const data = {
      username,
      password
    }

    fetch('http://localhost:4000/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        setNewNotification('')
        const keyName = Object.keys(data)[0]

        if (keyName === 'error') setNewNotification(data.error)
        else
          setNewNotification(
            `A new User ${data.user.username} has been created.`
          )
        console.log('this the data console', data)
      })
  }

  const handleLogin = async ({ username, password }) => {
    const body = {
      username: username,
      password: password
    }

    fetch('http://localhost:4000/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then((response) => response.json())
      .then((data) => {
        const keyName = Object.keys(data)[0]

        console.log('this is my login data', data)

        if (keyName === 'token') {
          setLoginResponse('Login succesful')
          localStorage.setItem('LoginToken', data.token)
        } else {
          setLoginResponse('Error: Username or Password are invalid!')
        }
      })
  }

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {}

  return (
    <div className="App">
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} />
      {newNotification && <p>{newNotification} </p>}

      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} />
      {loginResponse && <p>{loginResponse} </p>}
      <h1>Create a movie</h1>
      <MovieForm handleSubmit={handleCreateMovie} />

      <h1>Movie list</h1>
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>Description: {movie.description}</p>
              <p>Runtime: {movie.runtimeMins}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App
