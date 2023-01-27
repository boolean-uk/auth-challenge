import UserForm from "./UserForm";
import { Link } from "react-router-dom";

function Register({ handleSubmit, regError, setRegError, regSuccess }) {
  return (
    <>
      <h1>Register</h1>
      <UserForm
        handleSubmit={handleSubmit}
        regError={regError}
        setRegError={setRegError}
        regSuccess={regSuccess}
      />
      {regError !== undefined && <>{regError}</>}
      <Link to="/login">
        <button>login</button>
      </Link>
    </>
  );
}

export default Register;
