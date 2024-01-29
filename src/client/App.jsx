import { useState } from 'react';
import { handleRegister } from '../server/controllers/user';
import './App.css';
import SignUpForm from './components/SignUpForm'

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

function App() {
  const initForm = {
    username: "",
    password: ""
  }
  const [loginForm, setLoginForm] = useState(initForm)
  const [signUpForm, setSignUpForm] = useState(initForm)

  const handleInput = (event) => {
    const { name, value } = event.target
    setLoginForm({...loginForm, [name]: value})
    setSignUpForm({...loginForm, [name]: value})
  }

  return (
    <div className="App">
      <h1>Register an account</h1>
      <SignUpForm handleInput={handleInput} handleSubmit={handleRegister} />
    </div>
  );
}

export default App;
