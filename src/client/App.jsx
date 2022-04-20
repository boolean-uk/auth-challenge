import RegisterLogin from "./components/registerLogin";
import Movie from "./components/movie";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Routes, Route } from "react-router";
import "./App.css";

const apiUrl = "http://localhost:4000";

function App() {
  const blank = { username: "", password: "" };

  const [register, setRegister] = useState(blank);
  const [registerMessage, setRegisterMessage] = useState("");

  const [login, setLogin] = useState(blank);
  const [loginMessage, setLoginMessage] = useState("");

  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault();

    setLoginMessage("")
    setRegisterMessage("")

    fetch(apiUrl + "/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.message) {
        setRegister(blank);
        navigate("/login")
        }
        else if (data.error) {
        setRegisterMessage(data.error)
        }
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

    setLoginMessage("")
    setRegisterMessage("")

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
          setLoginMessage("")
          localStorage.setItem("token", data.data);
          navigate("/movie")
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
            <Movie />
          }
        />
      </Routes>
    </>
  );
}

export default App;
