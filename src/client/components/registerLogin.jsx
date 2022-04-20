import Form from "./form";
import Item from "./item";
import { useNavigate } from "react-router-dom";

function RegisterLogin(props) {

    const navigate = useNavigate()

  const { formname, handleSubmit, handleItem, username, password, message } =
    props;

  return (
    <div className='App'>
      <Form
        formname={formname}
        handleSubmit={handleSubmit}
        inputs={[
          <Item
            type='text'
            placeholder='Username'
            name='username'
            value={username}
            handleChange={handleItem}
          />,
          <Item
            type='text'
            placeholder='Password'
            name='password'
            value={password}
            handleChange={handleItem}
          />,
        ]}
      />

      {message && <p>{message}</p>}
      <br />
      <div>New to CinemaApp? <strong><a onClick={() => navigate("/register")}>Register here</a></strong></div>
      <div>Already a user? <strong><a onClick={() => navigate("/login")}>Login here</a></strong></div>
    </div>
  );
}

export default RegisterLogin;
