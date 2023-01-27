import UserForm from "./UserForm";
import { Link } from "react-router-dom";

function Login({ handleSubmit, setRegError }) {
  return (
    <>
      <h1>Login</h1>
      <UserForm handleSubmit={handleSubmit} setRegError={setRegError} />
      <Link to="/">
        <button>register</button>
      </Link>
    </>
  );
}

export default Login;
