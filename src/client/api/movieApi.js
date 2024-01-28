import axios from 'axios'

const port = import.meta.env.VITE_PORT
const apiUrl = `http://localhost:${port}`

const createMovieApi = async (movie, setMessage, clearMovieForm) => {
  try {
    const token = localStorage.getItem('token')

    await axios.post(`${apiUrl}/movie`, movie, {
      headers: { Authorization: `Bearer ${token}` }
    })

    clearMovieForm()
    setMessage(null)
  } catch (error) {
    setMessage(error.response.data.error)
  }
}

export { createMovieApi }
