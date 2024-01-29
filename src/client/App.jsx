import { useState } from 'react';
import './App.css';
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm';
import MovieForm from './components/MovieForm';

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

function App() {
  const initForm = {
    username: "",
    password: ""
  }
  const [loginForm, setLoginForm] = useState(initForm)
  const [signUpForm, setSignUpForm] = useState(initForm)

  const handleLoginInput = (event) => {
    const { name, value } = event.target
    setLoginForm({...loginForm, [name]: value})
  }

  const handleLoginSubmit = (event) => {
    event.preventDefault()
  }
  
  const handleRegisterInput = (event) => {
    const { name, value } = event.target
    setSignUpForm({ ...signUpForm, [name]: value})
  }
  
  const handleRegisterSubmit = async (event) => {
    event.preventDefault()
    const headers = { 'Content-Type': 'application/json' }
    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(signUpForm)
    }

    const answer = await fetch(`${apiUrl}/register`, options)
  }

  return (
    <div className="App">
      <h1>Register an account</h1>
      <SignUpForm handleInput={handleRegisterInput} handleSubmit={handleRegisterSubmit} />
      <h1>Login to your account</h1>
      <LoginForm handleInput={handleLoginInput} handleSubmit={handleLoginSubmit} />
      <h1>Create a new movie</h1>
      <MovieForm />
    </div>
  );
}

export default App;
