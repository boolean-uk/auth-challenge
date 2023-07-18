import '../App.css'
import React from 'react'
import { useState } from 'react'
const apiUrl = 'http://localhost:4000'

export function Register () {
  const registerInitialState = {}
  const [registerState, setRegisterState] = useState(registerInitialState)
  const [registerResponse, setRegisterResponse] = useState('');
  const [registerMessage, setRegisterMessage] = useState('')
  // const [token, setToken] = useState('');
  // const [loggedIn, setLoggedIn] = useState('');

  const register = async (e) => {
    e.preventDefault()
    console.log("registerState", registerState)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(registerState)
    }
    await fetch(apiUrl + '/user', options)
    .then((res) => res.json())
    .then((res) => {
      setRegisterMessage(res.message)
    })
  }

  const handleRegisterChange = (e) => {
    const username =  e.target.form[0].value
    const password  =  e.target.form[1].value

    setRegisterState({ username, password })
  }

  return (
      <section className="register form">
        <h2>Register</h2>
        <form onSubmit={register} onChange={handleRegisterChange}>
          <input id="username" placeholder="Username"/>
          <input type="password" placeholder="Password"/>
          <button>Register</button>
        </form>
      <h4>{registerMessage && <p>{registerMessage}</p>}</h4>
      </section>
  )
}
