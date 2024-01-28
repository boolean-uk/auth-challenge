import axios from 'axios'

const port = import.meta.env.VITE_PORT
const apiUrl = `http://localhost:${port}`

const getAllMoviesApi = async (setMovies, setMessage) => {
  try {
    const {
      data: { movies }
    } = await axios.get(`${apiUrl}/movie`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })

    setMovies(movies)
  } catch (error) {
    setMessage(error.response.data.error)
  }
}

const createMovieApi = async (
  movie,
  setMessage,
  clearMovieForm,
  getAllMovies
) => {
  try {
    await axios.post(`${apiUrl}/movie`, movie, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })

    clearMovieForm()
    setMessage(null)
    getAllMovies()
  } catch (error) {
    setMessage(error.response.data.error)
  }
}

export { getAllMoviesApi, createMovieApi }
