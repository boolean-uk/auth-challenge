import '../App.css'
import React from 'react'
import { useState, useEffect } from 'react'
const apiUrl = 'http://localhost:4000'

export function AddMovie () {
  const movieInitialState = {}
  const [movieState, setMovieState] = useState(movieInitialState)
  const [movieList, setMovieList] = useState([{title:'Nothing yet'}])

  useEffect(() => {
    getAllMovies()
  }, [])

  const createMovie = async (e) => {
    e.preventDefault()
    console.log("movieState", movieState)
    const token = localStorage.getItem("token")
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        "authorization": token
      },
      body: JSON.stringify(movieState)
    }
    const res = await fetch(apiUrl + '/movie', options)
    getAllMovies()
  }

  const handleMovieChange = (e) => {
    const title  =  e.target.form[0].value
    const desc  =  e.target.form[1].value
    const runtime  =  e.target.form[2].value

    setMovieState({ title, desc, runtime })
  }

  const getAllMovies = async () => {
    console.log("Starting GET for all movies")
    const movieList = await fetch(apiUrl + '/movie')
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        res.movies && setMovieList(res.movies)
      })
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
      {movieList && movieList.map((item) => {
        return (
          <div key={item.id} className="movie-list">
            <p className="movie-card">
              <p>Title: {item.title}</p><hr />
              <p>Description: {item.description}</p><hr />
              <p>Runtime: {item.runtimeMins}</p>
            </p>
          </div>
        )
      }).reverse()}
      </section>
  )
}
