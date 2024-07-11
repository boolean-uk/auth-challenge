import "./styles/App.css"
import Register from "./components/Register"
import Login from "./components/Login"
import Movies from "./components/Movies"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./components/Dashboard"

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/movies" element={<Movies />} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
