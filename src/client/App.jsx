import './App.css';
import { LoginForm } from './components/LoginForm';

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

function App() {
  return (
    <div className="App">
      <LoginForm apiUrl={ apiUrl }/>
    </div>
  );
}

export default App;
