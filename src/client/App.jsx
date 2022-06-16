import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import MovieForm from "./components/MovieForm";
import UserForm from "./components/UserForm";

const apiUrl = "http://localhost:4000";

function App() {
  const [movies, setMovies] = useState(null);
  const [updateMovieList, setUpdateMovieList] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/movie`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((res) => setMovies(res.data));
  }, [updateMovieList]);

  const handleRegister = async ({ username, password }) => {
    const url = "http://localhost:4000/user/register";
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
    const url = "http://localhost:4000/user/login";
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
    const url = "http://localhost:4000/movie";
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, description, runtimeMins }),
    };

    const fetchRes = await fetch(url, opts);

    if (data.error) {
      alert(data.error);
    }

    if (data.data) {
      setUpdateMovieList(updateMovieList + 1);
    }
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
  );
}

export default App;
