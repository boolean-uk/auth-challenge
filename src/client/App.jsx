import { useEffect, useState } from "react";
import "./App.css";
import MovieForm from "./components/MovieForm";
import UserForm from "./components/UserForm";

const apiUrl = "http://localhost:4000";

function App() {
  const [movies, setMovies] = useState([]);
  const [registerResponse, setRegisterResponse] = useState("");
  const [loginResponse, setLoginResponse] = useState("");
  const [movieResponse, setMovieResponse] = useState("")

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then((res) => res.json())
      .then((res) => setMovies(res.movies));
  }, [movies]);

  const handleRegister = async ({ username, password }) => {
    console.log("handleRegister called");
  
    const options = {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "content-type": "application/json",
      },
    };
  
    try {
      const response = await fetch(`${apiUrl}/user/register`, options);
      const data = await response.json();
      console.log(data)
  
      if ("error" in data) {
        setRegisterResponse("Username already exists");
      } else {
        setRegisterResponse(data.user.username);
      }
    } catch (error) {
      console.error("Error:", error);
      setRegisterResponse("Error occurred during registration");
    }
  };  

  const handleLogin = async ({ username, password }) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "content-type": "application/json",
        },
      };
  
      const response = await fetch(`${apiUrl}/user/login`, options);
      const data = await response.json();
  
      if ("error" in data) {
        setLoginResponse(data.error);
      } else {
        localStorage.setItem("token", data.data);
        setLoginResponse("Login successful");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoginResponse("Error occurred during login");
    }
  };
  
  
  

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    const options = {
      method: "POST",
      body: JSON.stringify({ title, description, runtimeMins }),
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    };
  
    try {
      const response = await fetch(`${apiUrl}/movie`, options);
      const data = await response.json();
  
      Object.keys(data)[0] !== "error"
        ? setMovieResponse(`${data.movie.title} added`)
        : setMovieResponse(data.error);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="App">
      <div className="register">
        <h1>Register</h1>
        <UserForm handleSubmit={handleRegister} />
        {registerResponse && <p>{registerResponse}</p>}
      </div>

      <div className="login">
        <h1>Login</h1>
        <UserForm handleSubmit={handleLogin} />
        {loginResponse && <p>{loginResponse}</p>}
      </div>

      <div className="movie">
        <h1>Create a movie</h1>
        <MovieForm handleSubmit={handleCreateMovie} />
        {movieResponse && <p>{movieResponse}</p>}
      </div>

      <div className="list">
        <h1>Movie list</h1>
        <ul>
          {movies.map((movie) => {
            return (
              <li key={movie.id}>
                <h3>{movie.title}</h3>
                <p>Description: {movie.description}</p>
                <p>Runtime: {movie.runtimeMins}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
