import "./App.css";
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
    </div>
  );
}

export default App;
