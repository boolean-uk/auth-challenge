import './App.css';
import {useState} from 'react'
import Form from './components/form';
import Input from './components/input';
import { placeholder } from '@babel/types';


const apiUrl = 'http://localhost:4000';


function App() {
  const [user, setUser] = useState({username: '', password: ''})
  // const [registerResponse, setRegisterResponse] = useState('');
  const [loginResponse, setLoginResponse] = useState('')



  const handleRegister = (event) => {
    event.preventDefault()

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(user)
    }

    fetch('http://localhost:4000/user/register', options)
    .then(response => response.json())
   

  
  }


  const handleLogin = (event) => {
    event.preventDefault()

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(user)
    }

    fetch('http://localhost:4000/user/login', options)
    .then(response => response.json())
    .then(data => {
      const response = data.token
      console.log(response)
      setLoginResponse(response)

      // Save Token
      localStorage.setItem('Token', response)
    })

  }
  
  const handleChange = (event) => {
    const {value, name} = event.target
    setUser({
      ...user,
      [name]: value
    })
  
  }
  return (
    <div className="App">
      <h1>Register</h1>
      <Form handleSubmit={handleRegister} className={"Register"} inputs = {[

        <Input type={'text'} name={'username'} placeholder={"Username"} handleChange={handleChange} value={user.username}/>,

        <Input type={'password'} name={'password'} placeholder={"Password"} handleChange={handleChange} value={user.password}/>
        
      ]}/>

      <h1>Login</h1>
      <Form handleSubmit={handleLogin} className={"Login"} inputs = {[
        <Input type={'text'} name={'username'} placeholder={"Username"} handleChange={handleChange} value={user.username}/>,
        
        <Input type={'password'} name={'password'} placeholder={"Password"} handleChange={handleChange} value={user.password }/>
      ]}/>


      <h1>Create a Movie</h1>
      <Form handleSubmit={handleRegister} className={"createMovie"} inputs = {[
        <Input type={'text'} name={'title'} placeholder={'Title'} handleChange={handleChange}/>,
        <Input type={'text'} name={'description'} placeholder={'Description'} handleChange={handleChange}/>,
        <Input type={'number'} name={'num'} placeholder={'Runtime'}/>
      ]}/>

      <h1>Movie List</h1>

      <ul>
        {/* Code that will be implemented here later */}
      </ul>

    </div>
  );
}

export default App;