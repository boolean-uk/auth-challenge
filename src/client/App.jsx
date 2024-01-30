import { useEffect, useState } from "react";
import "./App.css";
import MovieForm from "./components/MovieForm";
import UserForm from "./components/UserForm";

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then((res) => res.json())
      .then((res) => setMovies(res.data));
  }, []);

  const handleRegister = async ({ username, password }) => {
    try {
      const createdRegister = await fetch(`${apiUrl}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // Log the registration result (you may want to handle it appropriately)
      console.log(createdRegister);
    } catch (error) {
      // Handle errors during registration
      console.error("Error during registration:", error);
    }
  };

  const handleLogin = async ({ username, password }) => {
    try {
      const verifyLogin = await fetch(`${apiUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const logInToken = await verifyLogin.json();

      // Store the JWT token in local storage for future API requests
      localStorage.setItem("token", JSON.stringify(logInToken));
    } catch (error) {
      // Handle errors during login
      console.error("Error during login:", error);
    }
  };

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    try {
      // Retrieve the JWT token from local storage
      const token = JSON.parse(localStorage.getItem("token"));

      // Check if the token is present
      if (!token) {
        console.error("Token is missing. Please log in.");
        return;
      }

      // Make a request to create a movie using the stored token for authentication
      const createdMovie = await fetch(`${apiUrl}/movie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, runtimeMins }),
      });

      // Log the created movie result (you may want to handle it appropriately)
      console.log(createdMovie);
    } catch (error) {
      // Handle errors during movie creation
      console.error("Error during movie creation:", error);
    }
  };

  return (
    <div className="App">
      <UserForm title={"Registration"} endpoint={"user/register"} login={false} onSubmit={handleRegister} />
      <UserForm title={"Login"} endpoint={"user/login"} login={true} onSubmit={handleLogin} />
      <MovieForm onCreateMovie={handleCreateMovie} />
    </div>
  );
}

export default App;
