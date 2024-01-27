import axios from 'axios'

const port = import.meta.env.VITE_PORT
const apiUrl = `http://localhost:${port}`

const loginUserApi = async (user, setMessage, setIsAuth, clearUser) => {
  try {
    const response = await axios.post(`${apiUrl}/user/login`, {
      username: user.username,
      password: user.password
    })

    localStorage.setItem('token', response.data.token)
    setIsAuth(true)
    clearUser()

    return response
  } catch (error) {
    setMessage(error.response.data.error)
  }
}

export { loginUserApi }
