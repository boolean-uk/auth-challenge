import "./App.css";
import MovieForm from "./components/MovieForm";
import UserForm from "./components/UserForm";

function App() {
  return (
    <div className="App">
      <UserForm
        title={"Registration"}
        endpoint={"user/register"}
        login={false}
      />
      <UserForm title={"Login"} endpoint={"user/login"} login={true} />
      <MovieForm />
    </div>
  );
}

export default App;
