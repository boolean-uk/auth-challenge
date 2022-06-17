import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import MovieForm from "./components/MovieForm";
import UserForm from "./components/UserForm";

const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  const [movies, setMovies] = useState(null);
  const [updateMovieList, setUpdateMovieList] = useState(0);

  const navigate = useNavigate();

  useEffect(async () => {
    const opts = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const fetchRes = await fetch(`${apiUrl}/movie`, opts);
    const data = await fetchRes.json();

    setMovies(data.data);
  }, [updateMovieList]);

  const handleRegister = async ({ username, password }) => {
    const url = `${apiUrl}/register`;
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    const fetchRes = await fetch(url, opts);
    const data = await fetchRes.json();

    if (data.error) {
      alert(data.error);
    }
  };

  const handleLogin = async ({ username, password }) => {
    const url = `${apiUrl}/user/login`;
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    const fetchRes = await fetch(url, opts);
    const data = await fetchRes.json();

    localStorage.setItem("token", data.data);

    if (data.error) {
      alert(data.error);
    }

    if (data.data) {
      setUpdateMovieList(updateMovieList + 1);
      navigate("/movies");
    }
  };

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    const url = `${apiUrl}/movie`;
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, description, runtimeMins }),
    };

    const fetchRes = await fetch(url, opts);
    const data = await fetchRes.json();

    if (data.error) {
      alert(data.error);
    }

    if (data.data) {
      setUpdateMovieList(updateMovieList + 1);
    }
  };

  return (
    <div className="App">
      <nav>
        <ul className="nav-links">
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
      </nav>
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
  );
}

export default App;
