import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'

// Views
import HomePage from './views/HomePage'
import RegisterPage from './views/RegisterPage'
import LoginPage from './views/LoginPage'
import { useEffect, useState } from 'react'

function App() {
  const [user, setUser] = useState({ username: '', password: '' })
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      setIsAuth(true)
    }
  }, [])

  const userHandleChange = (event) => {
    const { value, name } = event.target

    setUser({
      ...user,
      [name]: value
    })
  }

  const clearUser = () => {
    setUser({ username: '', password: '' })
  }

  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? (
              <HomePage setIsAuth={setIsAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isAuth ? (
              <RegisterPage
                user={user}
                setIsAuth={setIsAuth}
                userHandleChange={userHandleChange}
                clearUser={clearUser}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuth ? (
              <LoginPage
                user={user}
                setIsAuth={setIsAuth}
                userHandleChange={userHandleChange}
                clearUser={clearUser}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
