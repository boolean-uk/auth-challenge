import { useState } from "react";
import enter from "../../assets/svg/enter.svg";
import {useNavigate} from 'react-router-dom'

export default function Form({ route }) {
  const navigate = useNavigate()
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

    if(route === 'login') {
      fetch(`http://localhost:4040/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then(res => {
          if(res.status === 400 || res.status === 401) {
            return alert('Invalid Credentials')
          }
          else return res.json()
        })
        .then(json => localStorage.setItem('token', json.user))
        .then(checkToken())
    }

    setUser({
      username: "",
      password: "",
    });

    if(route === 'register') {
      fetch(`http://localhost:4040/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then(res => {
            if(res.status === 409) {
              return alert('A user with that username already exists')
            }
            else return res.json()
        })
        .then(navigate('/login'))
    }
    
  }

  function checkToken() {
    const token = localStorage.getItem('token')
    if(typeof token === 'string') {
      return navigate('/movies')
    }
    else return <p>An error occured logging in</p>
  }

  return (
    <div className="form_box">
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
    </div>
  );
}
