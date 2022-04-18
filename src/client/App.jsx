/** @format */

import { useEffect, useState } from "react"
import "./App.css"
import MovieForm from "./components/MovieForm"
import UserForm from "./components/UserForm"

const apiUrl = "http://localhost:4000"

function App() {
  const [movies, setMovies] = useState([])
  const [registeredResponse, setRegisteredResponse] = useState()
  const [loginResponse, setLoginResponse] = useState()

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then((res) => res.json())
      .then((res) => setMovies(res.data))
  }, [])

  const handleRegister = async ({ username, password }) => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }
    fetch("http://localhost:4000/user/register", options)
      .then((res) => res.json())
      .then((json) =>
        setRegisteredResponse(
          "You have successfully registered with:" + json.data.username
        )
      )
      .catch(() => {
        setRegisteredResponse("Server error")
      })
  }

  const handleLogin = async ({ username, password }) => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }

    fetch("http://localhost:4000/user/login", options)
      .then((res) => res.json())
      .then((json) => {
        setLoginResponse("Logged In with token:" + json.data)
        localStorage.setItem("jwt", json.data)
      })
  }

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    const options = {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        title: title,
        description: description,
        runtimeMins: runtimeMins,
      }),
    }

    fetch("http://localhost:4000/movie", options)
      .then((res) => { res.json()
      .then((json) => {
        if (res.ok) {
          console.log(json.data)
        } else {
          console.log("Invalid response code:", res.status)
          console.log("Invalid response data:", json)
        }
      })
    })
      .catch((e) => {
        console.log("Unable to contact server:", e)
      })
  } 

  return (
    <div className="App">
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} />
      <p>{registeredResponse}</p>

      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} />
      <p>{loginResponse}</p>

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
