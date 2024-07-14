import './App.css';
import LandingPage from './components/LandingPage.jsx';

const port = import.meta.env.VITE_PORT;

function App() {
  return (
    <div className=' fixed-top-0 min-h-screen p-7 bg-stone-900 text-amber-500'>
      <h1 className="fixed-top-5 mb-5 p-5 text-3xl  bg-stone-800 text-center">Movie List App</h1>
      <LandingPage />
    </div>
  );
}

export default App;
