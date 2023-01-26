import { useState, useEffect } from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import MovieForm from "./components/MovieForm";

const apiUrl = "http://localhost:4000";

function App() {
  const [movies, setMovies] = useState([]);
  const [registerResponse, setRegisterResponse] = useState(null);
  const [loginResponse, setLoginResponse] = useState(null);
  const [movieResponse, setMovieResponse] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await fetch(`${apiUrl}/movie`);
    const data = await response.json();
    setMovies(data.movies);
  };

  const registerUser = async (user) => {
    if (!user.username && !user.password) return;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    const response = await fetch(`${apiUrl}/user/register`, options);
    const data = await response.json();
    if (data.error) {
      setRegisterError(data.error);
      return;
    }

    setRegisterResponse(data.status);
    // setUser({ username: "", password: "" });
  };

  const loginUser = async (user) => {
    if (!user.username && !user.password) return;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    const response = await fetch(`${apiUrl}/user/login`, options);
    const data = await response.json();
    if (data.error) {
      setLoginError(data.error);
      return;
    }
    localStorage.setItem("access-token", data.token);
    setLoginResponse(data.status);
    // setUser({ username: "", password: "" });
  };

  const createMovie = async (movie) => {
    if (!movie.title && !movie.description && !movie.runtimeMins) return;

    const accessToken = localStorage.getItem("access-token");

    if (!accessToken) {
      console.error("Please log in to create a movie");
      setMovieResponse("Please log in");
      return;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(movie),
    };

    try {
      const response = await fetch(`${apiUrl}/movie`, options);
      const data = await response.json();
      setMovies([...movies, data.movie]);
      // setMovie({
      //   title: "",
      //   description: "",
      //   runtimeMins: "",
      // });
      setMovieResponse("Created movie successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const removeAlert = () => {
    setTimeout(() => {
      setRegisterResponse(null);
      setLoginResponse(null);
      setMovieResponse(null);
      setLoginError(null);
      setRegisterError(null);
    }, 2000);
  };

  return (
    <div className="App">
      <h2>Register</h2>
      <UserForm handleSubmit={registerUser} />

      {registerError && (
        <>
          <p style={{ color: "red" }}>{registerError}</p>
          {removeAlert()}
        </>
      )}
      {registerResponse && (
        <>
          <p style={{ color: "lightgreen" }}>{registerResponse}</p>
          {removeAlert()}
        </>
      )}

      <h2>Log in</h2>
      <UserForm handleSubmit={loginUser} />

      {loginError && (
        <>
          <p style={{ color: "red" }}>{loginError}</p>
          {removeAlert()}
        </>
      )}
      {loginResponse && (
        <>
          <p style={{ color: "lightgreen" }}>{loginResponse}</p>
          {removeAlert()}
        </>
      )}

      <h2>Create a movie</h2>
      <MovieForm handleSubmit={createMovie} />

      {movieResponse && (
        <>
          <p style={{ color: "lightgreen" }}>{movieResponse}</p>
          {removeAlert()}
        </>
      )}

      <h2>Movie list</h2>
      {movies.map((movie) => {
        const { title, description, runtimeMins, id } = movie;
        return (
          <div key={id}>
            <h3>{title}</h3>
            <p>Description: {description}</p>
            <p>Runtime: {runtimeMins} minutes</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
