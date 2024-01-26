import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const userLocalStorage = () => {
  const storedUser = localStorage.getItem("user");
  try {
    return storedUser ? JSON.parse(storedUser) : { username: "", password: "" };
  } catch (error) {
    console.error("Error parsing stored user:", error);
    return { username: "", password: "" };
  }
};

export default function UserForm({ handleSubmit, error }) {
  const [user, setUser] = useState(() => userLocalStorage());

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmitDecorator = (e) => {
    e.preventDefault();
    handleSubmit(user);
    setUser({ username: "", password: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const isRegisterPage = location.pathname === "/register";

  return (
    <>
      <form onSubmit={handleSubmitDecorator}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      <p>
        {isRegisterPage
          ? `Already have an account? `
          : `Don't have an account? `}
        <Link to={isRegisterPage ? "/login" : "/register"}>
          {isRegisterPage ? "Log In" : "Register"}
        </Link>
      </p>
    </>
  );
}
