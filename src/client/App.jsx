import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import "./App.css"
import Register from "/Users/danielmccarthy/auth-challenge/src/client/components/Register.jsx"
import Login from "/Users/danielmccarthy/auth-challenge/src/client/components/Login.jsx"
import MovieList from "/Users/danielmccarthy/auth-challenge/src/client/components/MovieList.jsx"


function App() {
  let navigate = useNavigate();
  
  useEffect(() => {
    navigate("/register")
  }, [])

  
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/movieList" element={<MovieList />} />
      </Routes>
    </div>
  )
}

export default App
