import { useState } from 'react'

// components
import Form from '../components/Form'
import Input from '../components/Input'

// API
import { createMovieApi } from '../api/movieApi'

const HomePage = () => {
  const [message, setMessage] = useState(null)
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    runTime: 0
  })

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

    createMovieApi(movie, setMessage, clearMovieForm)
  }

  return (
    <div className="homePage">
      <h1 className="homePage__title">Movies</h1>

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
    </div>
  )
}

export default HomePage
