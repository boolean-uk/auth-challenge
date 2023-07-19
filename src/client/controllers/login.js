import React, { useState } from 'react'
import '../App.css'

const apiUrl = 'http://localhost:4000'

const Login = ({ setToken }) => {

  const [user, setUser] = useState({ username: '', password: '' })
  const [loginResponse, setLoginResponse] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { value, name } = e.target

    setUser({
      ...user,
      [name]: value
    })
  }

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const handleLogin = async (e) => {
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
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Invalid username or password')
          } else if (response.status === 400) {
            throw new Error('Missing fields in request body')
          } else {
            throw new Error('An unexpected error occurred')
          }
        }
        return response.json()
      })
      .then(function (data) {
        setLoginResponse(
          `Welcome ${capitalizeFirstLetter(user.username)}, You're logged in`
        )

        localStorage.setItem('Token', data.token)
        setToken(data.token)
        setUser(user)
        setTimeout(() => {
          setLoginResponse('')
        }, 5000)
      })
      .catch(function (error) {
        setLoginResponse(`Error: ${error.message}`)
      })
  }
  const handleCheckboxChange = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div className="login">
      <h2>LOGIN</h2>
      <form onSubmit={handleLogin}>
        <div className="input-container">
          {user.username && <label className="input-label">Username</label>}{' '}
          <br></br>
          <input
            placeholder="Username"
            type="text"
            name="username"
            onChange={handleChange}
            value={user.username}
          />
        </div>
        <div className="input-container">
          {user.password && <label className="input-label">Password</label>}{' '}
          <br></br>
          <input
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            onChange={handleChange}
            value={user.password}
          />
        </div>
        <div className="password-container">
          <label>Show Password</label>
          <input
            className="checkbox"
            type="checkbox"
            checked={showPassword}
            onChange={handleCheckboxChange}
          />
        </div>
        <br />
        <button className="button">Login</button>
        {loginResponse && <p className="response">{loginResponse}</p>}
      </form>
    </div>
  )
}

export default Login
