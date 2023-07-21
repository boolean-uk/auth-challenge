import "./App.css";
import Register from "../components/Register.js";
import Login from "../components/Login.js"
import Movie from "../components/Movie.js"

function App() {

  return (
    <div className="App">
      <Register />
      <Login />
      <Movie />
      <h1>Movie List</h1>
    </div>
  );
}

export default App;
