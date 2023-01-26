import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

const apiUrl = "http://localhost:4000";

function App() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    runtime: "",
  });
  const [movies, setMovies] = useState([]);
  const [registerResponse, setRegisterResponse] = useState(null);
  const [loginResponse, setLoginResponse] = useState(null);

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
      [name]: value,
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
  };

  const createMovie = (e) => {};

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

      {registerResponse && <p>{registerResponse}</p>}

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

      {loginResponse && <p>{loginResponse}</p>}

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
          name="runtime"
          value={movie.runtime}
          onChange={handleChangeMovie}
        />
        <button type="submit">Submit</button>
      </form>

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
