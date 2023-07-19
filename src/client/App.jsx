import "./App.css";
import Register from "/Users/sjb/BOOLEAN/BACKEND/auth-challenge/src/components/Register.js";
import Login from "/Users/sjb/BOOLEAN/BACKEND/auth-challenge/src/components/Login.js"
import Movie from "/Users/sjb/BOOLEAN/BACKEND/auth-challenge/src/components/Movie.js"


function App() {

  return (
    <div className="App">
      <Register />
      <Login />
      <Movie />
      <h1>Movie List</h1>
      <ul><li>Dodgeball</li>
      <li>Doom</li>
      </ul>
    </div>
  );
}

export default App;
