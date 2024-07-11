import "./App.css";
import { useState, useEffect } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LogInForm";
import FormChange from "./FormChange";
import MoviesPage from "./MoviesPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({ username: "", movies: [] });
  const [register, setRegister] = useState(true)

  useEffect(() => {
    async function getUser() {
      const token = localStorage.getItem("jwt");
      const data = await fetch("http://localhost:3000/user/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const json = await data.json();
      setUser(json.user)
    }
    getUser();
  }, [loggedIn]);

  

  if (loggedIn) {
    return (
    <main>
    <MoviesPage user={user} />
    </main>
    )
  }

  return (
    <main>
      <div className="grid place-items-center">
        <h1 className="text-4xl my-4">The Boolean Movie Database</h1>
        {register ? <RegisterForm /> : <LoginForm setLoggedIn={setLoggedIn} />}
       <FormChange register={register} setRegister={setRegister}/>
      </div>
    </main>
  );
}

export default App;
