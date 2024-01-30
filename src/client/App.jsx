import { useEffect, useState } from "react";
import "./App.css";
import MovieForm from "./components/MovieForm";
import UserForm from "./components/UserForm";

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

function App() {
  const [movies, setMovies] = useState([]);

  const [userResponse, setUserResponse] = useState(null);
  const [loginResponse, setLoginResponse] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then((res) => res.json())
      .then((res) => setMovies(res.data));
  }, []);

  const handleRegister = async ({ username, password }) => {
    try {
      const res = await fetch(`${apiUrl}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error!Status Code: ${res.status}`);
      }
      const data = await res.json();
      console.log(`Status Code: ${res.status}`, data);
      setUserResponse(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogin = async ({ username, password }) => {
    const data = { username, password };

    const userData = await fetch(`${apiUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const userLoginData = await userData.json();
    const userToken = userLoginData.data;
    localStorage.setItem("token", userToken);
    setLoginResponse(userToken);
  };

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found!Please login first!");
      }
      const res = await fetch(`${apiUrl}/movie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, runtimeMins }),
      });

      const data = await res.json();

      if (res.ok) {
        setMovies((prevMovies) => [...prevMovies, data.data]);
        console.log(data, token);
      } else {
        throw new Error(data.message || "Failed to create movie");
      }
    } catch (error) {
      console.error("An error occurred during movie creation:", error.message);
    }
  };

  return (
    <div className="App">
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} />
      {userResponse ? <h3>Account created!</h3> : <h3>Create an account!</h3>}
      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} />
      {loginResponse ? <h3>Login successful!</h3> : <h3>Login</h3>}
      <h1>Create a movie</h1>
      <MovieForm handleSubmit={handleCreateMovie} />

      <h1>Movie list</h1>
      <ul>
        {loginResponse &&
          movies.map((movie) => {
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
