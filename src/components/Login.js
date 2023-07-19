import React from "react";
import { useState } from "react";

const apiUrl = "http://localhost:4000";

export default function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [loginResponse, setLoginResponse] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  }

  function handleLogin(event) {
    event.preventDefault();
   

    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };
  
      fetch(`${apiUrl}/user/login`, options)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          setLoginResponse(`${user.username} has been logged in`)
          localStorage.setItem("Token", data.token );
          
        });
}

return (
    <><h2>Login</h2>
    <form onSubmit={handleLogin}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={user.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={user.password}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>

      <p>{loginResponse}</p>
    </form>
    </>
  );
}