import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import RegisterUser from "./RegisterUser"
import UserForm from "./UserForm"

import '../styles/home.css'

function Home({ apiUrl }) {

    const navigate = useNavigate()

    const [loginMessage, setLoginMessage] = useState('')
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
        <section className="home--container grid">
          <RegisterUser apiUrl={apiUrl} />
            <div className="home--form-container home--login-container grid">
                <h1>Login</h1>
                <UserForm handleSubmit={handleLogin} />
                {loginMessage && <p>{loginMessage}</p>}
            </div>
        </section>
    )
}

export default Home