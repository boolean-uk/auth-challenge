import { useState } from "react";

export default function AddNewMovieform() {
    const [formData, setFormData] = useState({ title: "", description: "", runtimeMins: 0 });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      }
    
      async function handleSubmit(e) {
        e.preventDefault();
 
      }

    return (
        <form
      className="flex flex-col place-items-center p-4 bg-gradient-to-bl from-teal-200 rounded-md w-56 max-w-56"
      onSubmit={handleSubmit}
    >
   
      <label htmlFor="title">Title </label>
      <input
        className="border"
        onChange={handleChange}
        type="textbox"
        name="title"
        value={formData.title}
      />
      <label htmlFor="description">Description </label>
      <input
        className="border"
        onChange={handleChange}
        type="textbox"
        name="description"
        value={formData.Description}
      />
      <button
        type="submit"
        className="bg-slate-400 p-2 mt-2 rounded-md cursor-pointer drop-shadow-md"
      >
        Submit
      </button>
    </form>
    )
}