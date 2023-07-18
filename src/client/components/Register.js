import { useState } from "react";

export default function Register() {
  const [user, setUser] = useState({ username: "", password: "" });

  const [registerResponse, setRegisterResponse] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .then((data) => {
        setRegisterResponse(data.data.token);
        localStorage.setItem("token", registerResponse.token);
      })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        ></input>
        <button type="submit">Register</button>
      </form>
    </>
  );
}
