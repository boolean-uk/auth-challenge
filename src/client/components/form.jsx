function Form(props) {
  const { formname, handleSubmit, inputs } = props;
  return (
    <form className='form' onSubmit={handleSubmit}>
      <h2>{formname}</h2>
      {inputs.map((input) => input)}
      <button type='submit'>Submit</button>
    </form>
  );
}

export default Form;
