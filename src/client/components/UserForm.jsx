import { useEffect, useState } from "react";

const userLocalStorage = () => {
  const storedUser = localStorage.getItem("user");
  try {
    return storedUser ? JSON.parse(storedUser) : { username: "", password: "" };
  } catch (error) {
    console.error("Error parsing stored user:", error);
    return { username: "", password: "" };
  }
};

export default function UserForm({ handleSubmit, error }) {
  const [user, setUser] = useState(() => userLocalStorage());
  const handleSubmitDecorator = (e) => {
    e.preventDefault();
    handleSubmit(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <>
      <form onSubmit={handleSubmitDecorator}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
}
