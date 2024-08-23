import { createContext } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";

export const appContext = createContext();

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

function App() {
  return (
    <appContext.Provider value={{apiUrl}}>
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/users" element={}/>
    </Routes>
    </appContext.Provider>
  );
}

export default App;
