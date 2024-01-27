import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'

// Views
import HomePage from './views/HomePage'
import RegisterPage from './views/RegisterPage'
import LoginPage from './views/LoginPage'
import { useEffect, useState } from 'react'

const port = import.meta.env.VITE_PORT
const apiUrl = `http://localhost:${port}`

function App() {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {}, [])

  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={isAuth ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
