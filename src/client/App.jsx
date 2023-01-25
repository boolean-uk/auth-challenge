import { useState } from "react";

import "./App.css";

const apiUrl = "http://localhost:4000";

function App() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [movies, setMovies] = useState([]);

  return (
    <div className="App">
      <h2>Register</h2>
      <form>
        <input type="text" placeholder="username" />
        <input type="text" placeholder="password" />
        <button type="submit">Submit</button>
      </form>

      <h2>Log in</h2>
      <form>
        <input type="text" placeholder="username" />
        <input type="text" placeholder="password" />
        <button type="submit">Submit</button>
      </form>

      <h2>Create a movie</h2>
      <form>
        <input type="text" placeholder="title" />
        <input type="text" placeholder="description" />
        <input type="text" placeholder="runtime" />
        <button type="submit">Submit</button>
      </form>

      <h2>Movie list</h2>
    </div>
  );
}

export default App;
