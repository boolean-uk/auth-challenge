import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
// import MovieForm from './components/MovieForm';
// import UserForm from './components/UserForm';
// // import RegisterUser from './components/RegisterUser.jsx';
// import RegisterUser from './components/RegisterUser.jsx';
// import LoginUser from './components/LogInUser.jsx';
import LandingPage from './components/LandingPage.jsx';

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;


function App() {
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([])


  return (
    <div className="App">
      <h2>Welcome</h2>
      <LandingPage />
    </div>
  );
}

export default App;
