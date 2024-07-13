import { useState } from "react";

export default function MovieForm({ token, addMovie, baseURL }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [runtimeMins, setruntimeMins] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${baseURL}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, runtimeMins }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data && !data.error) {
          addMovie(data);
          setTitle("");
          setDescription("");
          setruntimeMins("");
          setError("");
        } else {
          setError(data.error);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Movie</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <input
        type="text"
        value={runtimeMins || ""}
        onChange={(e) => setruntimeMins(Number.parseInt(e.target.value, 10))}
        placeholder="Run Time"
      />
      <button className="submit-btn" type="submit">
        Add Movie
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}
