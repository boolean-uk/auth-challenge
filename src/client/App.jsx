import { useState } from 'react';
import './App.css';

const apiUrl = 'http://localhost:4000';
const InitialNewUser = {
  username: '',
  password: ''
}

function App() {
  const [newUser, setNewUser] = useState(InitialNewUser)

  const handleChange = (e) => {
    const { name } = e.target
    setNewUser({...newUser, [name]: e.target.value})
    console.log(newUser)
  }

  const handleRegister = (e) => {
    e.preventDefault()

    const user = {
      username: newUser.username,
      password: newUser.password
    }

    const options = {
      method: "post",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
  }
  
  fetch(`${apiUrl}/user/register`, options)
  .then(function (response) {
      console.log('response returned...', response)
      return response.json()
  })
  }

  return (
    <div className="App">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>
          Username: 
          <input type="text" name='username' onChange={handleChange}/>
        </label>
        <label>
          Password:
          <input type="password" name='password' onChange={handleChange}/>
        </label>
          <input type="submit"/>
      </form>
    </div>
  );
}

export default App;