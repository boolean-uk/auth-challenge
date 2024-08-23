import { useState, useContext } from "react";
import { appContext } from "../App";
import UserForm from "./UserForm";
import CreateMovie from "./CreateMovie";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { apiUrl } = useContext(appContext);
  const [registerStatus, setRegisterStatus] = useState(null);
  const [loginStatus, setLoginStatus] = useState(null);
  const [hasAuthToken, setAuthToken] = useState(false);


  const handleRegister = async (user) => {
    fetch(apiUrl + "/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setRegisterStatus(data.error);
        } else {
          setRegisterStatus("Registration Successful!");
        }
      });
  };

  const handleLogin = async (user) => {
    fetch(apiUrl + "/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setLoginStatus(data.error);
        } else {
          setLoginStatus("Login Successful!");        localStorage.setItem("jwt", data.token);
          setAuthToken(true);
        }
      });
  };
  return (
    <div className="container">
      <Link to={`/users`}>See All Users</Link>
      <h1>Register</h1>
      <UserForm handleURL={handleRegister} status={registerStatus} />
      <h1>Login</h1>
      <UserForm handleURL={handleLogin} status={loginStatus} />
      <button
        type="button"
        onClick={() => {
          localStorage.removeItem("jwt");
          setAuthToken(false);
        }}
      >
        Log Out
      </button>
      <CreateMovie setAuthToken={setAuthToken} hasAuthToken={hasAuthToken}/>
    </div>
  );
}
