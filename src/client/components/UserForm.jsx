import { useState, useEffect } from "react";

export default function UserForm({
  handleSubmit,
  regError,
  setRegError,
  regSuccess,
}) {
  const [user, setUser] = useState({ username: "", password: "" });
  const [noUsername, setNoUsername] = useState(false);
  const [userPlace, setUserPlace] = useState("username");
  const [pwPlace, setPwPlace] = useState("password");

  useEffect(() => {
    if (regSuccess === true) {
      setUser({ username: "", password: "" });
    }
  }, [regSuccess]);

  const handleSubmitDecorator = (e) => {
    e.preventDefault();
    if (user.username === "") return setUserPlace("please enter username..");
    if (user.password === "") return setPwPlace("please enter password..");
    handleSubmit(user);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setRegError(undefined);
    console.log(e.target.name);
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmitDecorator}>
      <input
        type="text"
        name="username"
        placeholder={userPlace}
        value={user.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder={pwPlace}
        value={user.password}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
      {noUsername && <p>please enter a username</p>}
    </form>
  );
}
