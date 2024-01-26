import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import UserForm from "./UserForm"

function Home({ apiUrl }) {

    const navigate = useNavigate()

    const [registerMessage, setRegisterMessage] = useState('')
    const [loginMessage, setLoginMessage] = useState('')

    const handleRegister = async ({ username, password }) => {
        try {
          const { data } = await axios.post(`${apiUrl}/user/register`, {
            username,
            password
          }, {
              headers: { 'Content-Type': 'application/json' },
            }
          )
          setRegisterMessage(data.message)
        }
        catch (err) {
          setRegisterMessage(err.response.data.error)
        }
      };
    
      const handleLogin = async ({ username, password }) => {
        try {
          const { data } = await axios.post(`${apiUrl}/user/login`, {
            username,
            password
          }, {
              headers: { 'Content-Type': 'application/json' },
            }
          )
          const { token, message } = data
          localStorage.setItem('token', token)
          setLoginMessage(message)
          navigate('/movie-list')
        }
        catch (err) {
          setLoginMessage(err.response.data.error)
        }
      };

    return (
        <>
            <h1>Register</h1>
            <UserForm handleSubmit={handleRegister} />
            {registerMessage && <p>{registerMessage}</p>}

            <h1>Login</h1>
            <UserForm handleSubmit={handleLogin} />
            {loginMessage && <p>{loginMessage}</p>}
        </>
    )
}

export default Home