import { useState } from "react";
import UserForm from "../../components/UserForm";
import api from "../../../server/api/axios.js";
import "./index.css";

export default function RegisterPage() {
  const [registerMessage, setRegisterMessage] = useState("");

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
    <div className="register-page">
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} />
      {registerMessage && <p>{registerMessage}</p>}
    </div>
  );
}
