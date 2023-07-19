import { useState } from "react"

export default function MovieForm({ handleSubmit }) {
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    runtimeMins: 0
  })

  const handleChange = (e) => {
    const { value, name } = e.target

    setMovie({
      ...movie,
      [name]: value
    })
  }

  const submitFunction = (e) => {
    e.preventDefault()
    handleSubmit(movie)
  }

  return (
    <form onSubmit={submitFunction}>
      <input type='text' name='title' placeholder='Title' value={movie.title} onChange={handleChange} />
      <input type='text' name='description' placeholder='Description' value={movie.description} onChange={handleChange} />
      <input type='number' name='runtimeMins' value={movie.runtimeMins} min='0' step='1' onChange={handleChange} />
      <button type='submit'>Submit</button>
    </form>
  )
}