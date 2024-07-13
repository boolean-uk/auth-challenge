import { useState } from "react";
import enter from "../../assets/svg/enter.svg";
import { Link } from "react-router-dom";

export default function Form({ route }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (user.username.length > 20) {
      return alert("Username must be no more than 20 characters");
    }

    if (user.username === "" || user.password === "") {
      return alert("Username or password fields are missing");
    }

    fetch(`http://localhost:4040/${route}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(json => localStorage.setItem('token', json.user))

    setIsLoggedIn(true);

    setUser({
      username: "",
      password: "",
    });
  }

  return (
    <>
    {isLoggedIn &&
    <Link to='/films'>
    <h3>Add Films!</h3>
    </Link>
    }
      <form name="form" id="form" onSubmit={(e) => handleSubmit(e)}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          id="username_input"
          className="text_input"
          value={user.username}
          required
          onChange={(e) => handleChange(e)}
        />
        <input
          name="password"
          type="text"
          placeholder="Password"
          id="password_input"
          className="text_input"
          value={user.password}
          required
          onChange={(e) => handleChange(e)}
        />
        <button name="submit" type="submit" className="enter_button">
          <img src={enter} className="icon" id="enter_form" alt="enter icon" />
        </button>
      </form>
    </>
  );
}
