import Form from "./form";
import Item from "./item";

function RegisterLogin(props) {
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
    </div>
  );
}

export default RegisterLogin;
