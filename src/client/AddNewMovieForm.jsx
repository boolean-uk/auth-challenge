/* eslint-disable react/prop-types */
import { useState } from "react";
import url from "../utils/baseurl";

export default function AddNewMovieform({getMovies}) {
    const [formData, setFormData] = useState({ title: "", description: "", runtimeMins: ''});

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      }
    
      async function handleSubmit(e) {
        e.preventDefault();
        await fetch(`${url}/movies`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        getMovies()
        setFormData({ title: "", description: "", runtimeMins: ''})
      }

    return (
        <form
      className="flex flex-col place-items-center p-4 bg-gradient-to-bl from-teal-200 rounded-md w-56 max-w-56 mt-4"
      onSubmit={handleSubmit}
    >
    <p className="text-2xl">Add New Movie</p>
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
        value={formData.description}
      />
        <label htmlFor="runtimeMins">Runtime (minutes)</label>
      <input
        className="border"
        onChange={handleChange}
        type="textbox"
        name="runtimeMins"
        value={formData.runtimeMins}
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