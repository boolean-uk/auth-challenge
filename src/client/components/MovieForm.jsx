export default function MovieForm ({ handleInput, handleSubmit }) {
  return (
    <form onChange={handleInput} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input name="title" />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input name="description" />
      </div>
      <div>
        <label htmlFor="durationMins">Duration (minutes)</label>
        <input name="durationMins" />
      </div>
      <button>Create</button>
    </form>
  )
}