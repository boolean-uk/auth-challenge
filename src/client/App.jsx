import UserForm from "./components/UserForm";
import MovieForm from "./components/MovieForm";
import { useState, useEffect } from "react";

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

function App() {
  const [movies, setMovies] = useState([]);
  const [registerStatus, setRegisterStatus] = useState(null);
  const [loginStatus, setLoginStatus] = useState(null);
  const [movieStatus, setMovieStatus] = useState(null);

  useEffect(() => {
    fetch(apiUrl + '/movie')
      .then((res) => res.json())
      .then((data) => setMovies(data.movies));
  }, []);


   const handleRegister = async (user) => {
    fetch(apiUrl + '/user/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setRegisterStatus(data.error);
        } else {
          console.log("Registration successful:", data.user);
          setRegisterStatus("Registration Successful!")
        }
      })

   };

   const handleLogin = async (user) => {
    fetch(apiUrl + "/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setLoginStatus(data.error);
        } else {
          console.log("Login successful:", data.token);
          setLoginStatus("Registration Successful!");
          localStorage.setItem("jwt", data.token);
        }
      });

   };

   const handleCreateMovie = async (movie) => {
    const token = localStorage.getItem("jwt");
    console.log("token", token);

    fetch(apiUrl + "/movie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(movie),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setMovieStatus(data.error);
        } else {
          console.log("Registration successful:", data.movie);
          setMovieStatus("New Movie Created!");
        }
      });


   };

  return (
    <div className="container">
      <h1>Register</h1>
      <UserForm handleURL={handleRegister} status={registerStatus} />
      <h1>Login</h1>
      <UserForm handleURL={handleLogin} status={loginStatus} />
      <h1>Create a movie</h1>
      <MovieForm handleURL={handleCreateMovie} status={movieStatus} />
      <h1>Movie List</h1>
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

export default App
