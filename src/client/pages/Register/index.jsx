import { useState } from "react";
import UserForm from "../../components/UserForm";
import api from "../../../server/api/axios.js";
import { Link, useNavigate } from "react-router-dom";
import "../forms.css";

export default function RegisterPage() {
  const [registerMessage, setRegisterMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async ({ username, password }) => {
    try {
      const res = await api.post("/user/register", { username, password });

      setRegisterMessage("Registration Successful");
    } catch (e) {
      console.log(e.message);
      setRegisterMessage(e.response.data.error ?? "Registration Failed");
    }
  };

  return (
    <div className="register-page form-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        Go back
      </button>

      <div className="register-page--form form-container">
        <h1>Register</h1>
        <p>
          Already have an account? <Link to="/login">Login</Link>{" "}
        </p>
        <UserForm handleSubmit={handleRegister} />
        {registerMessage && <p className="error-message">{registerMessage}</p>}
      </div>
    </div>
  );
}
