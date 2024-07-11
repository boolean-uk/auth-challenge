import UserForm from "./UserForm"

function RegisterPage({ handleSubmit, error, setError }) {

    return (
        <>
            <h2>Register</h2>
            <UserForm handleSubmit={handleSubmit} error={error} setError={setError} />
        </>
    )
  }
  
  export default RegisterPage