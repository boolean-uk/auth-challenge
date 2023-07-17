import './App.css';
import { Route, Routes } from "react-router-dom"
// import UserLogin from './Components/UserLogin'
import UserRegister from './Components/UserRegister'

const apiUrl = 'http://localhost:4000';

function App() {
  return (
    <Routes>
        {/* <Route
          path='login'
          element={<UserLogin />}
        /> */}
        <Route
          path='/'
          element={<UserRegister />}
        />

    </Routes>
  );
}

export default App;