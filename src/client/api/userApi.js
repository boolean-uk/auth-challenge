import axios from 'axios'

const port = import.meta.env.VITE_PORT
const apiUrl = `http://localhost:${port}`

const loginUserApi = async (user, setMessage, setIsAuth, clearUser) => {
  try {
    const { data } = await axios.post(`${apiUrl}/user/login`, {
      username: user.username,
      password: user.password
    })

    localStorage.setItem('token', data.token)
    setIsAuth(true)
    clearUser()

    return data
  } catch (error) {
    setMessage(error.response.data.error)
  }
}

const registerUserApi = async (user, setMessage, navigate, clearUser) => {
  try {
    const { data } = await axios.post(`${apiUrl}/user/register`, {
      username: user.username,
      password: user.password
    })

    clearUser()
    navigate('/login')

    return data
  } catch (error) {
    setMessage(error.response.data.error)
  }
}

export { loginUserApi, registerUserApi }
