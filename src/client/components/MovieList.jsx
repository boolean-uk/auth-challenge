import React from "react"
import MovieForm from "./MovieForm"
import { useState, useEffect } from "react"

const apiUrl = "http://localhost:4000"

export default function MovieList() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then((res) => res.json())
      .then((res) => setMovies(res.data))
  }, [])

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        title: title,
        description: description,
        runtimeMins: runtimeMins,
      }),
    }

    fetch("http://localhost:4000/movie", options)
      .then((res) => {
        res.json().then((json) => {
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
    <>
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
    </>
  )
}
