import { useEffect, useState } from "react";
import "./App.css";
import MovieForm from "./components/MovieForm";
import UserForm from "./components/UserForm";

const apiUrl = "http://localhost:4000";

function App() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [movies, setMovies] = useState([]);
  const [registerResponse, setRegisterResponse] = useState("");
  const [loginResponse, setLoginResponse] = useState("");
  const [movieResponse, setMovieResponse] = useState("")

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then((res) => res.json())
      .then((res) => setMovies(res.data))
  }, []);

  const handleRegister = async ({ username, password }) => {
    setUser({ username, password });

    const options = {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json",
      },
    };

    try {
      const response = await fetch(`${apiUrl}/user/register`, options);
      const data = response.json();

      Object.keys(data)[0] !== "error"
        ? setRegisterResponse(data.user.username)
        : setRegisterResponse("Username already exists");
    } catch (error) {
      console.error("Error:", error);
      setRegisterResponse("Error occurred during registration");
    }
  };

  const handleLogin = async ({ username, password }) => {
    setUser({username, password})
    const options = {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json",
      },
    };

    try {
      const response = await fetch(`${apiUrl}/user/login`, options);
      const data = response.json();

      Object.keys(data)[0] !== "error"
        ? (setLoginResponse("Login successful"),
          localStorage.setItem("token", data.token))
        : setLoginResponse(data.error);
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
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      const response = await fetch(`${apiUrl}/movie`, options);
      const data = response.json();

      Object.keys(data)[0] !== "error"
        ? setMovieResponse(`${data.title} added`)
        : setMovieResponse(data.error)
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
