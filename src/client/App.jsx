import { useState } from "react";

import "./App.css";

const apiUrl = "http://localhost:4000";

function App() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    runtime: "",
  });
  const [movies, setMovies] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

    console.log(user);
  };

  return (
    <div className="App">
      <h2>Register</h2>
      <form>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Log in</h2>
      <form>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Create a movie</h2>
      <form>
        <input
          type="text"
          placeholder="title"
          name="title"
          value={movie.title}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="description"
          name="description"
          value={movie.description}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="runtime"
          name="runtime"
          value={movie.runtime}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Movie list</h2>
    </div>
  );
}

export default App;
