import { useEffect, useState } from "react";
import { Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import "./App.css";
import MovieForm from "./components/MovieForm";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then((res) => res.json())
      .then((res) => setMovies(res.data));
  }, []);

  const handleRegister = async ({ username, password }) => {
    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };
    const response = await fetch(`${apiUrl}/user/register`, option);
    if (response.ok) {
      await response.json();
      localStorage.clear();
      navigate("login");
      setError(null);
    } else {
      const result = await response.json();
      setError(result.error);
    }
  };

  const handleLogin = async ({ username, password }) => {
    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };
    const response = await fetch(`${apiUrl}/user/login`, option);
    if (response.ok) {
      const result = await response.json();
      setError(null);
      localStorage.setItem("userToken", result.data.token);
      localStorage.removeItem("user");
      navigate("dashboard");
    } else {
      const result = await response.json();
      setError(result.error);
      console.log(result.error);
    }
  };

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
      setError("User token is missing");
    }

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ title, description, runtimeMins }),
    };

    const response = await fetch(`${apiUrl}/movie`, option);
    if (response.ok) {
      const result = await response.json();
      console.log(result.data);
      setMovies([...movies, result.data]);
    } else {
      const result = await response.json();
      setError(result.error);
    }
  };

  return (
    <Box p={4}>
      <Routes>
        <Route
          path="/register"
          element={
            <RegisterPage
              handleRegister={handleRegister}
              error={error}
              setError={setError}
            />
          }
        />
        <Route
          path="/login"
          element={<LoginPage handleLogin={handleLogin} error={error} />}
        />
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              movies={movies}
              handleCreateMovie={handleCreateMovie}
              error={error}
            />
          }
        />
        <Route path="/" element={<Navigate to="/register" />} />
      </Routes>
    </Box>
  );
}

export default App;
