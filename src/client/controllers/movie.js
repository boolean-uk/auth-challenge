import React, { useState, useEffect } from 'react'

const apiUrl = 'http://localhost:4000'

const Movie = ({ token }) => {
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    runtimeMins: undefined
  })

  const [movies, setMovies] = useState([])
  const [movieResponse, setMovieResponse] = useState('')

  const handleMovieChange = (e) => {
    const { value, name } = e.target
    const updatedValue = name === 'runtimeMins' ? parseInt(value) || '' : value
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: updatedValue
    }))
  }

  useEffect(
    () => {
      const fetchMovies = async () => {
        try {
          const response = await fetch(`${apiUrl}/movie`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          const data = await response.json()
          setMovies(data.movies)
        } catch (error) {
          console.error('Error:', error)
        }
      }

      fetchMovies()
    },
    [token],
    [movies]
  )

  const createMovie = async (e) => {
    e.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(movie)
    }
    fetch(`${apiUrl}/movie`, options)
      .then(function (response) {
        if (!response.ok) {
          if (response.status === 400) {
            throw new Error('Missing fields in request body')
          } else if (response.status === 403) {
            return response.json().then(function (data) {
              throw new Error(data.error)
            })
          } else if (response.status === 409) {
            return response.json().then(function (data) {
              throw new Error('Movie with this title already exists')
            })
          } else {
            throw new Error('An unexpected error occurred')
          }
        }

        return response.json()
      })
      .then(function (data) {
        setMovieResponse('Movie has been created')
        setTimeout(() => {
          setMovieResponse('')
        }, 5000)
      })
      .catch(function (error) {
        setMovieResponse(`Error: ${error.message}`)
      })
  }

  return (
    <div>
      {token && (
        <div className={`movie ${token ? '' : 'hidden'}`}>
          {token && <h2>ADD A MOVIE</h2>}
          <form onSubmit={createMovie}>
            <div className="input-container">
              {movie.title && (
                <label className="input-label-movies">Title</label>
              )}{' '}
              <br></br>
              <input
                placeholder="Title"
                type="text"
                name="title"
                onChange={handleMovieChange}
                value={movie.title}
              />
            </div>
            <div className="input-container">
              {movie.description && (
                <label className="input-label-movies">Description</label>
              )}{' '}
              <br></br>
              <input
                placeholder="Description"
                type="text"
                name="description"
                onChange={handleMovieChange}
                value={movie.description}
              />
            </div>
            <div className="input-container">
              {movie.runtimeMins && (
                <label className="input-label-movies">Duration</label>
              )}{' '}
              <br></br>
              <input
                placeholder="Duration"
                type="number"
                name="runtimeMins"
                onChange={handleMovieChange}
                value={movie.runtimeMins}
              />
            </div>
            <br />
            <button className="button">Add</button>
            {movieResponse && <p className="response">{movieResponse}</p>}
          </form>
        </div>
      )}
      {token && (
        <div>
          <h1>LIST OF MOVIES</h1>
          {movies.map((movie) => (
            <div key={movie.id} className={`movies ${token ? '' : 'hidden'}`}>
              <h3>{movie.title}</h3>
              <p>Description: {movie.description}</p>
              <p>Runtime: {movie.runtimeMins} minutes</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Movie
