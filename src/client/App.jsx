import { useEffect } from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login"

const apiUrl = "http://localhost:4000";

function App() {

  return (
    <div className="App">
      <Register />
      <Login />
    </div>
  );
}

export default App;
