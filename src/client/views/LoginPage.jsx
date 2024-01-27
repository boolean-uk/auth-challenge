import { Link } from 'react-router-dom'
import { useState } from 'react'

// Components
import Form from '../components/Form'
import Input from '../components/Input'

// API
import { loginUserApi } from '../api/userApi'

const LoginPage = ({ user, setIsAuth, userHandleChange, clearUser }) => {
  const [message, setMessage] = useState(null)

  const submitLogin = (event) => {
    event.preventDefault()

    loginUserApi(user, setMessage, setIsAuth, clearUser)
  }

  return (
    <div className="loginPage">
      <h1 className="loginPage__title">Login</h1>
      <span className="loginPage__subtitle">
        Need an account? <Link to="/register">Sign Up</Link>
      </span>

      <Form
        handleSubmit={submitLogin}
        inputs={[
          <Input
            key={1}
            type="text"
            name="username"
            placeholder="Type your username"
            value={user.username}
            handleChange={userHandleChange}
          />,
          <Input
            key={2}
            type="password"
            name="password"
            placeholder="Type your password"
            value={user.password}
            handleChange={userHandleChange}
          />
        ]}
      />

      {message && <p className="message">{message}</p>}
    </div>
  )
}

export default LoginPage
