import { prisma } from "@prisma/client";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Movies from "./components/Movies";
import Register from "./components/Register";
import Login from "./components/Login";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:4000";

function App() {
  const navigate = useNavigate();

  const [token, setToken] = useState([]);
  const [movies, setMovies] = useState([]);
  const [regError, setRegError] = useState(undefined);
  const [regSuccess, setRegSuccess] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(undefined);

  useEffect(() => {
    if (loggedInUser !== undefined) {
      fetch(`${apiUrl}/movie/${loggedInUser.id}`)
        .then((res) => res.json())
        .then((res) => {
          setMovies(res.data);
        });
    }
  }, [loggedInUser]);

  const handleRegister = async ({ username, password }) => {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    fetch(`${apiUrl}/user/register`, opts)
      .then((res) => {
        if (res.ok !== true) {
          throw Error(`The username ${username} is already taken!`);
        }
        setRegSuccess(true);
      })
      .then((data) => {
        navigate("/login");
      })
      .catch((err) => {
        return setRegError(err.message);
      });
  };

  const handleLogin = async ({ username, password }) => {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    fetch(`${apiUrl}/user/login`, opts)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.accessToken);
        setToken(localStorage.token);
        setLoggedInUser(data.user);
        navigate("/movies");
      });
  };

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        runtimeMins,
        userId: loggedInUser.id,
      }),
    };
    fetch(`${apiUrl}/movie`, opts)
      .then((res) => res.json())
      .then((data) => {
        const movie = { ...data.data };
        const updatedMovies = [...movies, movie];
        setMovies(updatedMovies);
      });
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Register
              handleSubmit={handleRegister}
              regError={regError}
              setRegError={setRegError}
              regSuccess={regSuccess}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login handleSubmit={handleLogin} setRegError={setRegError} />
          }
        />
        <Route
          path="/movies"
          element={
            <Movies movies={movies} handleCreateMovie={handleCreateMovie} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
