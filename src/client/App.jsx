import { useEffect, useState } from 'react'
import './App.css'
import MovieForm from './components/MovieForm'
import UserForm from './components/UserForm'

const apiUrl = 'http://localhost:4000'

function App() {
  const [movies, setMovies] = useState([])
  const [registerNewUser, setregisterNewUser] = useState('')

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then((res) => res.json())
      .then((res) => setMovies(res.data))
  }, [])

  const handleRegister = async ({ username, password }) => {
    // TODO
    // Send request to register from here alex
    // You can do it. Just dont stop till you get it right and understand it

    const body = {
      username: username,
      password: username
    }
    console.log('this is before my fetch')
    useEffect((event) => {
      event.preventDefault()

      fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then((response) => response.json())
        .then((data) => {
          const key = Object.keys(data)[0]
          console.log('this is my data', data)
          if (key === 'username') {
            setregisterNewUser('Registered succesfully!')
          } else {
            setregisterNewUser('Error: Username taken already')
          }
        })
    })
  }

  const handleLogin = async ({ username, password }) => {}

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {}

  return (
    <div className="App">
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} />
      {registerNewUser && <p>{registerNewUser} </p>}
      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} />

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
