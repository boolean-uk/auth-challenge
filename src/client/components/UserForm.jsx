import { useState } from "react";

const UserForm = ({ handleSubmit }) => {
  const [user, setUser] = useState({ username: "", password: "" });

  const handleChangeUser = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const formWrapper = (e) => {
    e.preventDefault();
    handleSubmit(user);
  };

  return (
    <form onSubmit={formWrapper}>
      <input
        type="text"
        placeholder="username"
        name="username"
        value={user.username}
        onChange={handleChangeUser}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        value={user.password}
        onChange={handleChangeUser}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
