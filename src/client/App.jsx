import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Movie from "./components/Movie";

const apiUrl = "http://localhost:4000";

function App() {
  return (
    <div className="App">
      <Register />
      <Login />
      <Movie />
    </div>
  );
}

export default App;
