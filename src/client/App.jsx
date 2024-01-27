import Movies from "./components/Movies/Movies.jsx";
import Header from "./components/Header/Header.jsx";
import LoginPage from "./pages/Login/index.jsx";
import CreateMovie from "./pages/CreateAMovie/CreateMovie.jsx";
import RegisterPage from "./pages/Register/index.jsx";

import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-a-movie" element={<CreateMovie />} />
      </Routes>
    </div>
  );
}

export default App;
