import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

const userLocalStorage = () => {
  const storedUser = localStorage.getItem("user");
  try {
    return storedUser ? JSON.parse(storedUser) : { username: "", password: "" };
  } catch (error) {
    console.error("Error parsing stored user:", error);
    return { username: "", password: "" };
  }
};

export default function UserForm({ handleSubmit, error, setError }) {
  const [user, setUser] = useState(() => userLocalStorage());

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmitDecorator = async (e) => {
    e.preventDefault();
    try {
      await handleSubmit(user);
      setUser({ username: "", password: "" });
      setError(null);
    } catch (error) {
      // setError(error.message);
    }
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
        <FormControl id="user-form" isRequired>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
          />
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
          <Button type="submit">Submit</Button>
          {error && <p>{error}</p>}
        </FormControl>
      </form>

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
