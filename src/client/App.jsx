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

    await fetch(apiUrl + '/user/register', options)
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
    const data = await response.json()

    if(data.token) {
      localStorage.setItem("jwt", data.token)
    }

  }

  return (
    <div className='app'>
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister}/>

      <h2>Login</h2>
      <UserForm handleSubmit={handleLogin}/>

      <h2>Create a movie</h2>
      <MovieForm />
    </div>
  )
}

export default App
