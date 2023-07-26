import "./App.css";
import Register from "../components/Register.js";
import Login from "../components/Login.js"
import Movie from "../components/Movie.js"
import MovieList from "../components/MovieList";

function App() {

  return (
    <div className="App">
      <Register />
      <Login />
      <Movie />
      <MovieList />
    </div>
  );
}

export default App;
