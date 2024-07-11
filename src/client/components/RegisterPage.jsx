import UserForm from "./UserForm"
import { useContext } from "react"
import { DataContext } from "../App"

function RegisterPage() {
    const { handleRegister, registerError, setRegisterError} = useContext(DataContext)

    return (
        <>
            <h2>Register</h2>
            <UserForm handleSubmit={handleRegister} error={registerError} setError={setRegisterError} />
        </>
    )
  }
  
  export default RegisterPage