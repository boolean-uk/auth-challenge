import { useState } from "react";

export default function Register({ baseURL, setSuccessfulMessage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${baseURL}/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setError("");
          setUsername("");
          setPassword("");
          setSuccessfulMessage(data.message);
        } else {
          setSuccessfulMessage("");
          setError(data.error);
        }
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="registerForm">
        <h2>Sign up</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="submit-btn" type="submit">
          Register
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </>
  );
}
