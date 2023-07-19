import React, { useState } from 'react'
import Registration from '../client/controllers/register'
import Login from '../client/controllers/login'
import Movie from '../client/controllers/movie'
import './App.css'

const App = () => {
  
  const [token, setToken] = useState('')
  const [user, setUser] = useState({ username: '', password: '' })

  const handleSetToken = (newToken) => {
    setToken(newToken)
    localStorage.setItem('Token', newToken)
  }

  const handleSetUser = (newUser) => {
    setUser(newUser)
  }

  return (
    <div className="App">
      <Registration />
      <Login setToken={handleSetToken} setUser={handleSetUser} />
      {token && <Movie token={token} />}
    </div>
  )
}

export default App
