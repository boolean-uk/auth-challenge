import '../App.css'
import React from 'react'
import { useState } from 'react'
const apiUrl = 'http://localhost:4000'

export function Login () {
  const loginInitialState = {}
  const [loginState, setLoginState] = useState(loginInitialState)
  const [loginMessage, setLoginMessage] = useState('')

  const login = async (e) => {
    e.preventDefault()
    console.log("loginState", loginState)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(loginState)
    }
    await fetch(apiUrl + '/user/login', options)
    .then((res) => res.json())
    .then((res) => {
      setLoginMessage(res.message)
    })
  }

  const handleLoginChange = (e) => {
    const username =  e.target.form[0].value
    const password  =  e.target.form[1].value

    setLoginState({ username, password })
  }

  return (
      <section className="login form">
        <h2>Login</h2>
        <form onSubmit={login} onChange={handleLoginChange}>
          <input id="username" placeholder="Username"/>
          <input type="password" placeholder="Password"/>
          <button>Login</button>
        </form>
      <h4>{loginMessage && <p>{loginMessage}</p>}</h4>
      </section>
  )
}


