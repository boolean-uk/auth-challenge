import "./App.css";

const apiUrl = "http://localhost:4000";
import { useState, useEffect } from "react";

function App() {
  const newUser = {
    username: "",
    password: "",
  };

  const newMovie = {
    title: "",
    description: "",
    runtimeMins: "",
  };

  const newMovieList = [
    {
      key: 1,
      title: "Dodgeball",
      description: "The best movie",
      runtimeMins: "60",
    },
    { key: 2, title: "Doom", description: "Not so good", runtimeMins: "120" },
  ];

  const [user, setUser] = useState(newUser);
  const [savedUser, setSavedUser] = useState(newUser);
  const [movie, setMovie] = useState(newMovie);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:4000/movie`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        console.log(movies);
      });
  }, []);

  function handleChange(e) {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    if (inputName === "username") {
      setUser({ ...user, username: inputValue });
    } else if (inputName === "password") {
      setUser({ ...user, password: inputValue });
    } else if (inputName === "usernameLogin") {
      setSavedUser({ ...savedUser, username: inputValue });
    } else if (inputName === "passwordLogin") {
      setSavedUser({ ...savedUser, password: inputValue });
    } else if (inputName === "title") {
      setMovie({ ...movie, title: inputValue });
    } else if (inputName === "description") {
      setMovie({ ...movie, description: inputValue });
    } else if (inputName === "runTime") {
      setMovie({ ...movie, runtimeMins: inputValue });
    }
  }

  function handleRegister(e) {
    e.preventDefault();

    fetch("http://localhost:4000/user/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
  }

  function handleLogin(e) {
    e.preventDefault();

    fetch("http://localhost:4000/user/login", {
      method: "POST",
      body: JSON.stringify(savedUser),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status === 401) {
          setError("Invalid username or password");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        if (data && data.token) {
          setSavedUser({ ...savedUser, token: data.token });
          localStorage.setItem("Token", data.token);
        } else {
          setError("Token not receive or undefined");
        }
      })
      .catch((error) => {
        setError("An error occurred during login");
        console.error(error);
      });
  }

  function handleMovie(e) {
    // e.preventDefault();

    const authToken = localStorage.getItem("Token")

    fetch("http://localhost:4000/movie", {
      method: "POST",
      body: JSON.stringify(movie),
      headers: { "Content-Type": "application/json",
    "Authorization": `Bearer ${authToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setMovies((prevMovies) => [...prevMovies, data]);
      });
  }

  return (
    <div className="App">
      <div className="Entry-Fields" id="Register">
        <h2>Register</h2>
        <form>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Username"
            name="username"
          ></input>
          <input
            type="password"
            onChange={handleChange}
            placeholder="Password"
            name="password"
          ></input>
          <button type="submit" onClick={handleRegister}>
            Submit
          </button>
        </form>
      </div>
      <div className="Entry-Fields" id="Login">
        <h2>Login</h2>
        <form>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Username"
            name="usernameLogin"
          />
          <input
            type="password"
            onChange={handleChange}
            placeholder="Password"
            name="passwordLogin"
          />
          <button type="submit" onClick={handleLogin}>
            Submit
          </button>
        </form>
      </div>
      <div className="Entry-Fields" id="CreateMovie">
        <h2>Create a Movie</h2>
        <form>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Title"
            name="title"
          />
          <input
            type="text"
            onChange={handleChange}
            placeholder="Description"
            name="description"
          />
          <input
            type="number"
            onChange={handleChange}
            placeholder="Run Time"
            name="runTime"
          />
          <button type="submit" onClick={handleMovie}>
            Submit
          </button>
        </form>
      </div>
      <div className="Movie-List">
        <h2>Movie List</h2>
        <ul className="Movies">
          {movies.map((mov) => {
            return (
              <li>
                <h3>{mov.title}</h3>
                <p>Description: {mov.description}</p>
                <p>Runtime: {mov.runtimeMins}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
