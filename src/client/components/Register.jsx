import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
  });

  const [uniqueUsername, setUniqueUsername] = useState(true);

  const handleRegisterChange = (e) => {
    setUniqueUsername(true);

    const { name, value } = e.target;

    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: registerData.username,
        password: registerData.password,
      }),
    }).then((res) => {
      if (res.status === 409) {
        setUniqueUsername(false);
        return;
      }

      setRegisterData({
        username: "",
        password: "",
      });

      navigate("/login");
    });
  };

  return (
    <>
      <form onSubmit={handleRegisterSubmit} id="register">
        <h1>Register</h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          maxLength={50}
          value={registerData.username}
          onChange={handleRegisterChange}
          required
        />

        {!uniqueUsername && (
          <span id="username-not-unique">
            The username provided already exists
          </span>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={registerData.password}
          onChange={handleRegisterChange}
          required
        />

        <button type="submit">Submit</button>

        <span>
          Already have an account?
          <Link to={"/login"}>Log in</Link>
        </span>
      </form>
    </>
  );
}
