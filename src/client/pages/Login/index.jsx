import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserForm from "../../components/UserForm";
import api from "../../../server/api/axios.js";
import "../forms.css";

export default function LoginPage() {
  const [loginMessage, setLoginMessage] = useState("");

  const navigate = useNavigate();

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
    <div className="login-page form-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        Go back
      </button>

      <div className="login-page--form form-container">
        <h1>Login</h1>
        <p>
          No account? <Link to="/register">Register</Link> now!
        </p>
        <UserForm handleSubmit={handleLogin} />
        {loginMessage && <p className="error-message">{loginMessage}</p>}
      </div>
    </div>
  );
}
