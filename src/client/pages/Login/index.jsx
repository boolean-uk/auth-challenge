import { useState } from "react";
import { Link } from "react-router-dom";
import UserForm from "../../components/UserForm";
import api from "../../../server/api/axios.js";
import "./index.css";

export default function LoginPage() {
  const [loginMessage, setLoginMessage] = useState("");

  const handleLogin = async ({ username, password }) => {
    try {
      const res = await api.post("/user/login", { username, password });

      localStorage.setItem("user_login_token", res.data.data);
      setLoginMessage("Login Successful");
    } catch (e) {
      console.log(e.message);
      setLoginMessage(e.response.data.error ?? "Login Failed");
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <p>
        No account? <Link to="/register">Register</Link> now!
      </p>
      <UserForm handleSubmit={handleLogin} />
      {loginMessage && <p>{loginMessage}</p>}
    </div>
  );
}
