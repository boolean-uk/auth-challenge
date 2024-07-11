/* eslint-disable react/prop-types */


import { useState } from "react";

export default function LogInForm({ setLoggedIn }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const json = await data.json();
    if (json.token) {
        localStorage.setItem("jwt", json.token);
        setLoggedIn(true)
        return
    }

   setError(json.error)
  }

  return (
    <>
      <form
        className="flex flex-col place-items-center p-4 bg-gradient-to-bl from-teal-200 rounded-md w-56 max-w-56"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl mb-4">Log In</h2>
        <label htmlFor="username">Username </label>
        <input
          className="border"
          onChange={handleChange}
          type="textbox"
          name="username"
          value={formData.username}
        />
        <label htmlFor="password">Password </label>
        <input
          className="border"
          onChange={handleChange}
          type="password"
          name="password"
          value={formData.password}
        />
        <button
          type="submit"
          className="bg-slate-400 p-2 mt-2 rounded-md cursor-pointer drop-shadow-md"
        >
          Submit
        </button>
        {error && <p className="text-red-700 text-center">{error}</p>}
      </form>
    </>
  );
}
