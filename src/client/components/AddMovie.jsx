import '../App.css'
import React from 'react'
import { useState } from 'react'
const apiUrl = 'http://localhost:4000'

export function AddMovie () {
  const movieInitialState = {}
  const [movieState, setMovieState] = useState(movieInitialState)

  const createMovie = async (e) => {
    e.preventDefault()
    console.log("movieState", movieState)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(movieState)
    }
    const res = await fetch(apiUrl + '/movie', options)
    console.log(res)
  }

  const handleMovieChange = (e) => {
    const title  =  e.target.form[0].value
    const desc  =  e.target.form[1].value
    const runtime  =  e.target.form[2].value

    setMovieState({ title, desc, runtime })
  }

  return (
      <section className="movie form">
        <h2>Add a movie</h2>
        <form onSubmit={createMovie} onChange={handleMovieChange}>
          <input name='title' placeholder="Movie name"/>
          <input placeholder="Description"/>
          <input placeholder="Runtime"/>
          <button>Submit</button>
        </form>
      </section>
  )
}
