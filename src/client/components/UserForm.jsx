import { useState } from "react";

export default function UserForm({ handleURL, status }) {
  const [user, setUser] = useState({ username: "", password: "" });

  function handleSubmit(event) {
    event.preventDefault();
    handleURL(user);

    setUser({ username: "", password: "" });
  }

  function handleInput(event) {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={user.username}
        onChange={handleInput}
      ></input>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={user.password}
        onChange={handleInput}
      ></input>
      <button type="submit">Submit</button>
      
      {status && <p>{status}</p>}
    </form>
  );
}