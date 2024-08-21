import UserForm from "./components/UserForm";
import MovieForm from "./components/MovieForm";

function App() {


  return (
    <div className="container">
      <h1>Register</h1>
      <UserForm />
      <h1>Login</h1>
      <UserForm />
      <h1>Create a movie</h1>
      <MovieForm/>
      <h1>Movie List</h1>
    </div>
  );
}

export default App
