import { useState } from "react";

export default function Login({ setToken, setUserInfo, baseURL }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${baseURL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setToken(data.token);
          localStorage.setItem("jwt", data.token);

          setUserInfo(data.userInfo);
          localStorage.removeItem("userInfo");
          localStorage.setItem("userInfo", JSON.stringify(data.userInfo));

          setError("");
        } else {
          setError(data.error);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit} className="loginForm">
      <h2>Log in</h2>
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
        Login
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}
