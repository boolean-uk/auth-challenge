import axios from 'axios'

const port = import.meta.env.VITE_PORT
const apiUrl = `http://localhost:${port}`
const token = localStorage.getItem('token')

const headers = {
  headers: { Authorization: `Bearer ${token}` }
}

const getAllMoviesApi = async (setMovies, setMessage) => {
  try {
    const {
      data: { movies }
    } = await axios.get(`${apiUrl}/movie`, headers)

    setMovies(movies)
  } catch (error) {
    setMessage(error.response.data.error)
  }
}

const createMovieApi = async (movie, setMessage, clearMovieForm) => {
  try {
    await axios.post(`${apiUrl}/movie`, movie, headers)

    clearMovieForm()
    setMessage(null)
  } catch (error) {
    setMessage(error.response.data.error)
  }
}

export { getAllMoviesApi, createMovieApi }
