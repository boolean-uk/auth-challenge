import { Routes, Route } from 'react-router-dom'
import './App.css'
import './styling/dashboard.css'
import Dashboard from './components/dashboard/home'
import RegisterForm from './components/register/registerForm'
import LoginForm from './components/login/loginForm'
import SideDecoration from './components/filmdecoration/sideDecoration'


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
      </Routes>
      <SideDecoration />
    </div>
  )
}

export default App
