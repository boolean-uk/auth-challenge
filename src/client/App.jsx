import { useState } from "react";
import Movies from "./components/Movies/Movies.jsx";
import Header from "./components/Header/Header.jsx";
import LoginPage from "./pages/Login/index.jsx";
import CreateMovie from "./pages/CreateAMovie/CreateMovie.jsx";
import RegisterPage from "./pages/Register/index.jsx";

import { Routes, Route } from "react-router-dom";
import { MovieContext } from "./contexts.js";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  return (
    <div className="App">
      <Header />

      <MovieContext.Provider value={{ movies, setMovies }}>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create-a-movie" element={<CreateMovie />} />
        </Routes>
      </MovieContext.Provider>
    </div>
  );
}

export default App;
