import React, { useState } from 'react'
import Registration from '../client/controllers/register'
import Login from '../client/controllers/login'
import Movie from '../client/controllers/movie'
// import User from '../client/controllers/user'
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
      {/* {token && <User token={token} user={user.username} />} */}
      <Registration />
      <Login setToken={handleSetToken} setUser={handleSetUser} />
      {token && <Movie token={token} />}
    </div>
  )
}

export default App
