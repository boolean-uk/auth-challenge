import React from "react";
import { useState } from "react";

const apiUrl = "http://localhost:4000";

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [registerResponse, setRegisterResponse] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  }

  function handleRegister(event) {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    fetch(`${apiUrl}/user/register`, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setRegisterResponse(`${user.username} has been registered`);
      });
  }

  return (
    <><h2>Register</h2>
    <form onSubmit={handleRegister}>
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

      <p>{registerResponse}</p>
    </form>
    </>
  );
}
