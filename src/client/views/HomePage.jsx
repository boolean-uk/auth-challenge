import { useEffect, useState } from 'react'

// components
import Form from '../components/Form'
import Input from '../components/Input'
import MovieElement from '../components/MovieElement'

// API
import { createMovieApi, getAllMoviesApi } from '../api/movieApi'

const HomePage = ({ setIsAuth }) => {
  const [movies, setMovies] = useState([])
  const [message, setMessage] = useState(null)
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    runTime: 0
  })

  const getAllMovies = () => {
    getAllMoviesApi(setMovies, setMessage)
  }

  useEffect(() => {
    getAllMovies()
  }, [])

  const movieHandleChange = (event) => {
    const { value, name } = event.target

    setMovie({
      ...movie,
      [name]: value
    })
  }

  const clearMovieForm = () => {
    setMovie({
      title: '',
      description: '',
      runTime: 0
    })
  }

  const submitMovie = (event) => {
    event.preventDefault()

    createMovieApi(movie, setMessage, clearMovieForm, getAllMovies)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuth(false)
  }

  return (
    <div className="homePage container">
      <h1 className="homePage__title">Movies</h1>

      <button className="homePage__logout" onClick={logout}>
        Log out
      </button>

      <Form
        handleSubmit={submitMovie}
        inputs={[
          <Input
            key={1}
            type="text"
            name="title"
            placeholder="Title of movie"
            value={movie.title}
            handleChange={movieHandleChange}
          />,
          <Input
            key={2}
            type="text"
            name="description"
            placeholder="Description of movie"
            value={movie.description}
            handleChange={movieHandleChange}
          />,
          <Input
            key={3}
            type="number"
            name="runTime"
            placeholder="RunTime of movie"
            value={movie.runTime}
            handleChange={movieHandleChange}
          />
        ]}
      />

      {message && <p className="message">{message}</p>}

      <div className="homePage__movies">
        <h2 className="homePage__movies-title">Movies list</h2>
        <ul className="homePage__movies-list">
          {movies.map((movie, index) => (
            <MovieElement key={index} movie={movie} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HomePage
