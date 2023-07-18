import { useState, useEffect } from 'react';
import './App.css';

const apiUrl = 'http://localhost:4000';
const InitialNewUser = {
  username: '',
  password: ''
}
const InitialUserLogIn = {
  username: '',
  password: ''
}
const moviesState = {
  movieList: [],
  title: '',
  description: '',
  runtimeMins: 0,
}
function App() {
  const [newUser, setNewUser] = useState(InitialNewUser)
  const [logInUser, setLogInUser] = useState(InitialUserLogIn)
  const [token, setToken] = useState('')
  const [movies, setMovies] = useState(moviesState)


  const handleRegisterInfo = (e) => {
    const { name } = e.target
    setNewUser({...newUser, [name]: e.target.value})
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
        return response.json()
    })
    e.target.reset()
  }

  const handleLoginInfo = (e) => {
    const {name} = e.target
    setLogInUser({...logInUser, [name]: e.target.value})
  }

  const handleLogin = (e) => {
    e.preventDefault()

    const logInDetails = {
      username: logInUser.username,
      password: logInUser.password
    }

    const options = {
      method: "post",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(logInDetails)
    }
    fetch(`${apiUrl}/user/login`, options)
    .then(function (response) {
        return response.json()
    })
    .then(data => {
      setToken(data.token)
    })
    e.target.reset()
  }
  const handleMovies = (e) => {
    const {name} = e.target
    setMovies({...movies, [name]: e.target.value})
  }
  const createMovie = (e) => {
    e.preventDefault()

    const movieDetails = {
      title: movies.title,
      description: movies.description,
      runtimeMins: Number(movies.runtimeMins)
    }
    const options = {
      method: "post",
      headers: {
          "authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
      },
      body: JSON.stringify(movieDetails)
    }
    fetch(`${apiUrl}/movie`, options)
    .then(res => res.json())
    .then(data => {
      const moviesArr = movies.movieList
      moviesArr.push(data.createdMovie)
      setMovies({...movies, movieList: moviesArr})
      console.log(movies.movieList)
    })
    e.target.reset()
  }
  return (
    <div className="App">

      <h2>Register</h2>
      <form onSubmit={handleRegister}>
          <input placeholder='Username' type="text" name='username' onChange={handleRegisterInfo}/>
          <input type="password" placeholder='Password' name='password' onChange={handleRegisterInfo}/>
          <input type="submit"/>
      </form>


      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
          <input type="text" name='username' placeholder='Username' onChange={handleLoginInfo}/>
          <input type="password" placeholder='Password' name='password' onChange={handleLoginInfo}/>
        <input type="submit" />
      </form>


      <h2>Create a movie</h2>
      <form onSubmit={createMovie}>
        <input type="text" placeholder='Title' name='title' onChange={handleMovies}/>
        <input type="text" placeholder='Description' name='description' onChange={handleMovies}/>
        <input type="number" placeholder='Runtime in Mins' pattern='[0-9]*' name='runtimeMins' onChange={handleMovies}/>
        <input type="submit" />
      </form>

      <h2>Movie List</h2>
      {
        movies.movieList.map((movie, idx) => {
          return <div key={idx}>
            <h3>{movie.title}</h3>
            <p>Description: {movie.description}</p>
            <p>Runtime: {movie.runtimeMins}</p>
          </div>
        })
      }
    </div>
  );
}

export default App;