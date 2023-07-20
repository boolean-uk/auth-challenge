import './App.css';
import {useState} from 'react'
import Form from './components/form';
import Input from './components/input';


const apiUrl = 'http://localhost:4000';


function App() {
  const [user, setUser] = useState({username: '', password: '', usernameLogin: '', passwordLogin: ''})

  const [movieParams, setMovieParams] = useState({title: '', description: '', runtimeMins: ''})
  const [movies, setMovies] = useState([])

  
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

      // Save Token
      localStorage.setItem('Token', response)
    })

  }

  const handleCreateMovie = (event) => {
    event.preventDefault()

    const token = localStorage.getItem('Token')
    
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify(movieParams)
    }

    fetch('http://localhost:4000/movie', options)
    .then(response => response.json())
    .then(data => {
      const movie = data.createdMovie
      
      setMovies(movies => [...movies, movie])
      
    })


  }
  
  const handleChange = (event) => {
    const {value, name} = event.target
   
    if (name !== 'username' && name !== 'password') {
      setMovieParams({
        ...movieParams,
        [name]: value
      })

    }


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
        <Input type={'text'} name={'usernameLogin'} placeholder={"Username"} handleChange={handleChange} value={user.usernameLogin}/>,
        
        <Input type={'password'} name={'passwordLogin'} placeholder={"Password"} handleChange={handleChange} value={user.passwordLogin }/>
      ]}/>


      <h1>Create a Movie</h1>
      <Form handleSubmit={handleCreateMovie} className={"createMovie"} inputs = {[
        <Input type={'text'} name={'title'} placeholder={'Title'} handleChange={handleChange} value={movieParams.title}/>,
        <Input type={'text'} name={'description'} placeholder={'Description'} handleChange={handleChange} value={movieParams.description}/>,
        <Input type={'number'} name={'runtimeMins'} placeholder={'Runtime'} handleChange={handleChange} value={movieParams.runtimeMins}/>
      ]}/>
  

      <h1>Movie List</h1>
      <ul>
        {movies.map((obj, index) => {
          return (
            <li key={index}>
              <h2>{obj.title}</h2>
              <p>Description: {obj.description}</p>
              <p>Runtime: {obj.runtimeMins}</p>
            </li>
          )
        })}
      </ul>

    </div>
  );
}

export default App;