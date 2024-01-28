export default function Form({ handleSubmit, inputs }) {
  return (
    <form onSubmit={handleSubmit} className="form">
      {inputs.map((input) => input)}

      <button type="submit" className="form__button">
        Submit
      </button>
    </form>
  )
}
