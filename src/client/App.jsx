import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import MovieForm from "./components/MovieForm";
import UserForm from "./components/UserForm";

const apiUrl = "http://localhost:4000";

function App() {
  const [movies, setMovies] = useState(null);
  const [addedMovie, setAddedMovie] = useState(0);
  const [userLogged, setUserLogged] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/movie`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((res) => setMovies(res.data));
  }, [userLogged, addedMovie]);

  const handleRegister = async ({ username, password }) => {
    const url = "http://localhost:4000/user/register";
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    const fetchRes = await fetch(url, opts);
    const data = await fetchRes.json();
  };

  const handleLogin = async ({ username, password }) => {
    const url = "http://localhost:4000/user/login";
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    const fetchRes = await fetch(url, opts);
    const data = await fetchRes.json();

    localStorage.setItem("token", data.data);
    setUserLogged(username);

    if (data.data) {
      navigate("/movies");
    }
  };

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    const url = "http://localhost:4000/movie";
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        userLoggedIn: userLogged,
      },
      body: JSON.stringify({ title, description, runtimeMins }),
    };

    const fetchRes = await fetch(url, opts);
    // const data = await fetchRes.json();

    setAddedMovie(addedMovie + 1);
  };

  return (
    <div className="App">
      <ul>
        <Link to="/">
          <li>Login</li>
        </Link>
        <Link to="/register">
          <li>Register</li>
        </Link>
        <Link to="/movies">
          <li>Movies</li>
        </Link>
      </ul>
      <Routes>
        <Route
          path="/"
          element={<UserForm handleSubmit={handleLogin} title={"Login"} />}
        />
        <Route
          path="/register"
          element={
            <UserForm handleSubmit={handleRegister} title={"Register"} />
          }
        />
        <Route
          path="/movies"
          element={
            <MovieForm handleSubmit={handleCreateMovie} movies={movies} />
          }
        />
      </Routes>
    </div>
    // <div className="App">
    /* <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} />

      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} />

      <h1>Create a movie</h1>
      <MovieForm handleSubmit={handleCreateMovie} /> */

    // <h1>Movie list</h1>
    // <ul>
    //   {movies.map((movie) => {
    //     return (
    //       <li key={movie.id}>
    //         <h3>{movie.title}</h3>
    //         <p>Description: {movie.description}</p>
    //         <p>Runtime: {movie.runtimeMins}</p>
    //       </li>
    //     );
    //   })}
    // </ul>
    // </div>
  );
}

export default App;
