export default function Form({ handleSubmit, inputs }) {
  return (
    <form onSubmit={handleSubmit}>
      {inputs.map((input) => input)}

      <button type="submit">Submit</button>
    </form>
  )
}
