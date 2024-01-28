import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Components
import Form from '../components/Form'
import Input from '../components/Input'

// API
import { registerUserApi } from '../api/userApi'

const RegisterPage = ({ user, userHandleChange, clearUser }) => {
  const [message, setMessage] = useState(null)

  const navigate = useNavigate()

  const submitRegister = (event) => {
    event.preventDefault()

    registerUserApi(user, setMessage, navigate, clearUser)
  }

  return (
    <div className="registerPage container">
      <h1 className="registerPage__title">Register</h1>
      <span className="registerPage__subtitle">
        Already have an account? <Link to="/login">Log in</Link>
      </span>

      <Form
        handleSubmit={submitRegister}
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

export default RegisterPage
