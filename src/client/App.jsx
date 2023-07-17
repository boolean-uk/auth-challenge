import './App.css'
import React from 'react'

const apiUrl = 'http://localhost:4000'

console.log({ apiUrl })

const login = (e) => {
  e.preventDefault()
}
const register = (e) => {
  e.preventDefault()
}
const createMovie = (e) => {
  e.preventDefault()
}

function App () {
  return (
    <div className="App">

      <section className="register form">
        <h2>Register</h2>
        <form onSubmit={register} action="">
          <input placeholder="Username"/>
          <input type="password" placeholder="Password"/>
          <button>Register</button>
        </form>
      </section>

      <section className="login form">
        <h2>Login</h2>
        <form onSubmit={login}>
          <input placeholder="Username"/>
          <input type="password" placeholder="Password"/>
          <button>Login</button>
        </form>
      </section>

      <section className="movie form">
        <h2>Add a movie</h2>
        <form onSubmit={createMovie} action="">
          <input placeholder="Movie name"/>
          <input placeholder="Description"/>
          <input placeholder="Runtime"/>
          <button>Submit</button>
        </form>
      </section>

    </div>
  )
}

export default App
