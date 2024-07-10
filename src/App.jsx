import { useState } from "react"
import "./assets/styles/App.css"
import { useEffect } from "react"

function App() {
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
  })

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  })

  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    runtime: 0,
  })

  const [movies, setMovies] = useState([])
  const [token, setToken] = useState("")

  useEffect(() => {
    fetch("http://localhost:4000/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data.movies))
  }, [])

  const loadNewMovie = () => {
    fetch("http://localhost:4000/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data.movies))
  }

  const handleRegisterChange = (e) => {
    const { name, value } = e.target

    setRegisterData({
      ...registerData,
      [name]: value,
    })
  }

  const handleLoginChange = (e) => {
    const { name, value } = e.target

    setLoginData({
      ...loginData,
      [name]: value,
    })
  }

  const handleMovieChange = (e) => {
    const { name, value } = e.target

    setMovieData({
      ...movieData,
      [name]: value,
    })
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()

    fetch("http://localhost:4000/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: registerData.username,
        password: registerData.password,
      }),
    })

    setRegisterData({
      username: "",
      password: "",
    })
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()

    fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: loginData.username,
        password: loginData.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => setToken(data.token))

    localStorage.setItem("jwt", token)

    setLoginData({
      username: "",
      password: "",
    })
  }

  const handleMovieSubmit = (e) => {
    e.preventDefault()

    fetch("http://localhost:4000/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        title: movieData.title,
        description: movieData.description,
        runtime: Number(movieData.runtime),
      }),
    })

    setMovieData({
      title: "",
      description: "",
      runtime: "",
    })

    loadNewMovie()
  }

  return (
    <main>
      <form onSubmit={handleRegisterSubmit}>
        <h2>Register</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          maxLength={50}
          value={registerData.username}
          onChange={handleRegisterChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={registerData.password}
          onChange={handleRegisterChange}
        />

        <button type="submit">Submit</button>
      </form>

      <form onSubmit={handleLoginSubmit}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          name="username"
          value={loginData.username}
          onChange={handleLoginChange}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={loginData.password}
          onChange={handleLoginChange}
        />

        <button type="submit">Submit</button>
      </form>

      <form onSubmit={handleMovieSubmit}>
        <h2>Create a movie</h2>

        <input
          type="text"
          placeholder="Title"
          name="title"
          value={movieData.title}
          onChange={handleMovieChange}
        />

        <input
          type="text"
          placeholder="Description"
          name="description"
          value={movieData.description}
          onChange={handleMovieChange}
        />

        <input
          type="number"
          placeholder="Runtime"
          name="runtime"
          min={0}
          value={movieData.runtime}
          onChange={handleMovieChange}
        />

        <button type="submit">Submit</button>
      </form>

      <section>
        <h2>Movie list</h2>

        {movies.map((movie) => (
          <div key={movie.id}>
            <b>{movie.title}</b>

            <p>Description: {movie.description}</p>

            <span>Runtime: {movie.runtime}</span>
          </div>
        ))}
      </section>
    </main>
  )
}

export default App
