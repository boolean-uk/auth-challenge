import { Routes, Route } from 'react-router-dom'
import './App.css'
import './styling/dashboard.css'
import Dashboard from './components/dashboard/home'
import RegisterForm from './components/register/registerForm.jsx'
import LoginForm from './components/login/loginForm.jsx'
import SideDecoration from './components/filmdecoration/sideDecoration.jsx'
import AddFilm from './components/films/addFilm.jsx'


function App() {
  
  return (
    <div className='app_container'>
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
    </div>
  )
}

export default App
