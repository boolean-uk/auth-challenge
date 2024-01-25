import { useState } from 'react';
import { handleRegister } from '../server/controllers/user';
import './App.css';

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

function App() {
  const initForm = {
    username: "",
    password: ""
  }
  const form = useState(initForm)

  const handleInput = (event) => {
    const { name, value } = event.target
    console.log(name, value)
  }

  return (
    <div className="App">
      <h1>Register an account</h1>
      <form onChange={handleInput} onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username</label>
          <input name="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
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
      </form>
    </div>
  );
}

export default App;
