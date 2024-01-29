import { useState } from 'react';
import { handleRegister } from '../server/controllers/user';
import './App.css';
import LoginForm from './components/LoginForm';

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
        {/* <LoginForm handleInput={handleInput} handleSubmit={handleSubmit}/>
      <h1>Login into your account</h1>
      <form>
        <label htmlFor="username">
          Username
          <input name="username" />
        </label>
        <label htmlFor="password">
          Password
          <input name="password" type="password" />
        </label>
      </form> */}
    </div>
  );
}

export default App;
