import { useEffect, useState } from "react";
import "./App.css";
import MovieForm from "./components/MovieForm";
import UserForm from "./components/UserForm";
import axios from "axios";

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

function App() {
  const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   fetch(`${apiUrl}/movie`)
  //     .then((res) => res.json())
  //     .then((res) => setMovies(res.data));
  // }, []);

  const handleRegister = async ({ username, password }) => {
    // try {
    //   const { data } = await axios.post(`${apiUrl}/user/register`, {
    //     headers: { "Content-Type": "application/json" },
    //     username,
    //     password,
    //   });
    //   console.log(data.data);
    // } catch (err) {
    //   console.log(err.response.data)
    // }
    const data = {
      username,
      password,
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    console.log(username, password);

    const registerUserData = await fetch(`${apiUrl}/user/register`, options);
    const registeredUser = await registerUserData.json();

    return alert(registeredUser.message)
  };

  const handleLogin = async ({ username, password }) => {
    const data = {
      username,
      password,
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const logInUserData = await fetch(`${apiUrl}/user/login`, options);

    const loggedUser = await logInUserData.json();
    
    const userToken = loggedUser.data;

    localStorage.setItem("token", userToken);
    return alert(loggedUser.message);
  };

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {};

  return (
    <div className="App">
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} />

      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} />

      <h1>Create a movie</h1>
      <MovieForm handleSubmit={handleCreateMovie} />

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
  );
}

export default App;
