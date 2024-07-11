import './App.css'
import RegisterForm from './RegisterForm'
import LoginForm from './LogInForm'

function App() {

  return (
    <>
    
    <div className="grid place-items-center">
    <h1 className="text-4xl mb-4">The Boolean Movie Database</h1>
  <RegisterForm />
  <LoginForm />
    </div>
    </>
  )
}

export default App
