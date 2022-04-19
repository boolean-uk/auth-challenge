import RegisterLogin from "./components/registerLogin";
import Movie from "./components/movie";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import "./App.css";

const apiUrl = "http://localhost:4000";

function App() {
  const blank = { username: "", password: "" };
  const blankMovie = {
    title: "",
    description: "",
    runtimeMins: "",
  };

  const [moviesList, setMoviesList] = useState([]);

  const [register, setRegister] = useState(blank);
  const [registerMessage, setRegisterMessage] = useState("");

  const [login, setLogin] = useState(blank);
  const [loginMessage, setLoginMessage] = useState("");

  const [movie, setMovie] = useState(blankMovie);
  const [movieMessage, setMovieMessage] = useState("");

  useEffect(() => {
    fetch(apiUrl + "/movie")
      .then((res) => res.json())
      .then((data) => setMoviesList(data.movies));
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();

    setRegisterMessage("");
    setLoginMessage("");
    setMovieMessage("");

    fetch(apiUrl + "/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
    })
      .then((response) => response.json())
      .then((data) => {
        setRegisterMessage(data.message);
        setRegister(blank);
      })
      .catch((error) => {
        console.log("Error");
      });
  };

  const handleRegisterItem = (e) => {
    const { value, name } = e.target;

    setRegister({
      ...register,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setRegisterMessage("");
    setLoginMessage("");
    setMovieMessage("");

    fetch(apiUrl + "/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          setLoginMessage(data.data);
          localStorage.setItem("token", data.data);
        } else {
          setLoginMessage("Invalid Username or Password");
        }
        setLogin(blank);
      })
      .catch((error) => {
        console.log("Error");
      });
  };

  const handleLoginItem = (e) => {
    const { value, name } = e.target;

    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleCreateMovie = (e) => {
    e.preventDefault();

    setRegisterMessage("");
    setLoginMessage("");
    setMovieMessage("");

    if (localStorage.getItem("token")) {
      fetch(apiUrl + "/movie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(movie),
      })
        .then((response) => response.json())
        .then((data) => {
          setMoviesList([...moviesList, movie]);
          setMovieMessage(data.message);
          setMovie(blankMovie);
        })
        .catch((error) => {
          console.log("Error");
        });
    } else {
      setMovieMessage("User needs to be logged in to add movies");
      console.log("No user logged in");
    }
  };

  const handleCreateMovieItem = (e) => {
    const { value, name } = e.target;

    setMovie({
      ...movie,
      [name]: value,
    });
  };

  return (
    <>
      <Routes>
        <Route
          path='/register'
          element={
            <RegisterLogin
              formname={"Register User"}
              handleSubmit={handleRegister}
              handleItem={handleRegisterItem}
              username={register.username}
              password={register.password}
              message={registerMessage}
            />
          }
        />
        <Route
          path='/login'
          element={
            <RegisterLogin
              formname={"Sign In"}
              handleSubmit={handleLogin}
              handleItem={handleLoginItem}
              username={login.username}
              password={login.password}
              message={loginMessage}
            />
          }
        />
        <Route
          path='/movie'
          element={
            <Movie
              handleCreateMovie={handleCreateMovie}
              handleCreateMovieItem={handleCreateMovieItem}
              movie={movie}
              moviesList={moviesList}
              message={movieMessage}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
