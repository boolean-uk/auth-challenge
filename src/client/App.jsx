import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MovieList from './components/MovieList';
import './App.css';

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path='/'
          element={<Home apiUrl={apiUrl} />}
        >
        </Route>
        <Route
          path='/movie-list'
          element={<MovieList apiUrl={apiUrl} />}
        >
        </Route>
      </Routes>
    </div>
  );
}

export default App;
