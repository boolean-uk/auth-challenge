import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

const apiUrl = "http://localhost:4000";

function App() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    runtimeMins: "",
  });
  const [movies, setMovies] = useState([]);
  const [registerResponse, setRegisterResponse] = useState(null);
  const [loginResponse, setLoginResponse] = useState(null);
  const [movieResponse, setMovieResponse] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await fetch(`${apiUrl}/movie`);
    const data = await response.json();
    setMovies(data.movies);
  };

  const handleChangeUser = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleChangeMovie = (e) => {
    const { name, value } = e.target;

    setMovie({
      ...movie,
      [name]: name === "runtimeMins" ? Number(value) : value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    const response = await fetch(`${apiUrl}/user/register`, options);
    const data = await response.json();

    setRegisterResponse(data.status);
    setUser({ username: "", password: "" });

    // const response = axios.post(`${apiUrl}/user/register`, user);

    // console.log(response.data);
    // setRegisterResponse(response.data.status);
  };

  const loginUser = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    const response = await fetch(`${apiUrl}/user/login`, options);
    const data = await response.json();
    // if (data.error) {
    //   setLoginResponse(data.error);
    // }
    localStorage.setItem("access-token", data.token);
    setLoginResponse(data.status);
    setUser({ username: "", password: "" });
  };

  const createMovie = async (e) => {
    e.preventDefault();

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
      setMovie({
        title: "",
        description: "",
        runtimeMins: "",
      });
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
    }, 2000);
  };

  return (
    <div className="App">
      <h2>Register</h2>
      <form onSubmit={registerUser}>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={user.username}
          onChange={handleChangeUser}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={user.password}
          onChange={handleChangeUser}
        />
        <button type="submit">Submit</button>
      </form>

      {registerResponse && (
        <>
          <p style={{ color: "lightgreen" }}>{registerResponse}</p>
          {removeAlert()}
        </>
      )}

      <h2>Log in</h2>
      <form onSubmit={loginUser}>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={user.username}
          onChange={handleChangeUser}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={user.password}
          onChange={handleChangeUser}
        />
        <button type="submit">Submit</button>
      </form>

      {loginResponse && (
        <>
          <p style={{ color: "lightgreen" }}>{loginResponse}</p>
          {removeAlert()}
        </>
      )}

      <h2>Create a movie</h2>
      <form onSubmit={createMovie}>
        <input
          type="text"
          placeholder="title"
          name="title"
          value={movie.title}
          onChange={handleChangeMovie}
        />
        <input
          type="text"
          placeholder="description"
          name="description"
          value={movie.description}
          onChange={handleChangeMovie}
        />
        <input
          type="number"
          placeholder="runtime"
          name="runtimeMins"
          value={movie.runtimeMins}
          onChange={handleChangeMovie}
        />
        <button type="submit">Submit</button>
      </form>

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
