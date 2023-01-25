import { useState } from "react";
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

    // console.log(response);
    // setRegisterResponse(response.data.status);
  };

  const loginUser = (e) => {};

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
    </div>
  );
}

export default App;
