import React, { useState } from 'react'
import '../App.css'
const apiUrl = 'http://localhost:4000'

const Registration = () => {

  const [user, setUser] = useState({ username: '', password: '' })
  const [registerResponse, setRegisterResponse] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const handleChange = (e) => {
    const { value, name } = e.target

    setUser({
      ...user,
      [name]: value
    })
  }

  const handleRegister = async (e) => {
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
        if (!response.ok) {
          if (response.status === 400) {
            throw new Error('Missing fields in request body')
          } else if (response.status === 403) {
            response.json().then(function (data) {
              throw new Error(data.error)
            })
          } else if (response.status === 409) {
            return response.json().then(function (data) {
              throw new Error('Username already exists')
            })
          } else {
            throw new Error('An unexpected error occurred')
          }
        }

        return response.json()
      })
      .then(function (data) {
        setRegisterResponse(
          `Congratulations ${capitalizeFirstLetter(
            user.username
          )}! Your account has been created`
        )
        setTimeout(() => {
          setRegisterResponse('')
        }, 5000)
      })
      .catch(function (error) {
        setRegisterResponse(`Error: ${error.message}`)
      })
  }

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="register">
      <h2>REGISTER</h2>
      <form onSubmit={handleRegister}>
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
          {user.password && <label className="input-label">Password</label>}
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
        <button className="button">Register</button>
        {registerResponse && <p className="response">{registerResponse}</p>}
      </form>
    </div>
  )
}

export default Registration
