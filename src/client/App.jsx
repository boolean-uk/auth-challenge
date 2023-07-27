import "./App.css";
import Register from "../components/Register.js";
import Login from "../components/Login.js"
import MovieList from "../components/MovieList";

function App() {

  return (
    <div className="App">
      <Register />
      <Login />
      <MovieList />
    </div>
  );
}

export default App;
