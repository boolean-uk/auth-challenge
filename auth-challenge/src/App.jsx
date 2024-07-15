import { Routes, Route } from 'react-router-dom'
import './App.css'
import './styling/dashboard.css'
import Dashboard from './components/dashboard/home'
import RegisterForm from './components/register/registerForm.jsx'
import LoginForm from './components/login/loginForm.jsx'
import SideDecoration from './components/filmdecoration/sideDecoration.jsx'
import AddFilm from './components/films/addFilm.jsx'
import { createContext, useState } from 'react'
export const userContext = createContext()

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  return (
    <div className='app_container'>
      <userContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      <Routes>
        <Route 
        path='/'
        element={<Dashboard />}/>
        <Route 
        path='/register'
        element={<RegisterForm />}
        />
        <Route 
        path='/login'
        element={<LoginForm />}/>
        <Route 
        path='/movies'
        element={<AddFilm />}/>
      </Routes>
      <SideDecoration />
      </userContext.Provider>
    </div>
  )
}

export default App
