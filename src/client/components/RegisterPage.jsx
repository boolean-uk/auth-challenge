import UserForm from "./UserForm"
import { useContext } from "react"
import { DataContext } from "../App"

function RegisterPage() {
    const { handleRegister, registerError, setRegisterError} = useContext(DataContext)

    return (
        <div className="main">
            <h2>Register</h2>
            <UserForm handleSubmit={handleRegister} error={registerError} setError={setRegisterError} />
        </div>
    )
  }
  
  export default RegisterPage