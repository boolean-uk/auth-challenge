import './App.css';
import { Route, Routes } from "react-router-dom"
import UserLogin from './Components/UserLogin'
import UserRegister from './Components/UserRegister'
import Movies from './Components/Movies'

const apiUrl = 'http://localhost:4000';

function App() {
  return (
    <Routes>
        <Route
          path='login'
          element={<UserLogin />}
        />
        <Route
          path='/'
          element={<UserRegister />}
        />
        <Route
          path='movies'
          element={<Movies />}
        />


    </Routes>
  );
}

export default App;