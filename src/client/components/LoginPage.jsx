import UserForm from "./UserForm"

function LoginPage({ handleSubmit, error, setError }) {

    return (
        <>
            <h2>Login</h2>
            <UserForm handleSubmit={handleSubmit} error={error} setError={setError} />
        </>
    )
  }
  
  export default LoginPage