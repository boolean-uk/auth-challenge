import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: loginData.username,
        password: loginData.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("jwt", data.token);
      })
      .then(() => {
        setLoginData({
          username: "",
          password: "",
        });

        navigate("/movies");
      });
  };

  return (
    <form onSubmit={handleLoginSubmit} id="login">
      <h1>Log in</h1>

      <input
        type="text"
        placeholder="Username"
        name="username"
        value={loginData.username}
        onChange={handleLoginChange}
      />

      <input
        type="password"
        placeholder="Password"
        name="password"
        value={loginData.password}
        onChange={handleLoginChange}
      />

      <button type="submit">Submit</button>

      <span>
        Do not have an account yet?
        <Link to={"/register"}>Register</Link>
      </span>
    </form>
  );
}
