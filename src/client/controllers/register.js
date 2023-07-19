import React, { useState } from 'react'
import '../App.css'
const apiUrl = 'http://localhost:4000'

const Registration = () => {
  const [user, setUser] = useState({ username: '', password: '' })
  const [registerResponse, setRegisterResponse] = useState('')

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
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then(function (data) {
        setRegisterResponse(
          `Congratulations ${capitalizeFirstLetter(
            user.username
          )}! Your account has been created`
        )
      })
      .catch(function (error) {
        setRegisterResponse(`Error: ${error.message}`)
      })
  }

  return (
    <div className="register">
      <h2>REGISTER</h2>
      <form onSubmit={register}>
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
            type="password"
            name="password"
            onChange={handleChange}
            value={user.password}
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
