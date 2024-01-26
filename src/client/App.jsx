import './App.css';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

function App() {
  return (
    <div className="App">
      <RegisterForm apiUrl={ apiUrl }/>
      <LoginForm apiUrl={ apiUrl } />
    </div>
  );
}

export default App;
