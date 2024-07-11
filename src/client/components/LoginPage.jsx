import UserForm from "./UserForm"
import { useContext } from "react"
import { DataContext } from "../App"

function LoginPage() {
    const { handleLogin, loginError, setLoginError, } = useContext(DataContext)

    return (
        <>
            <h2>Login</h2>
            <UserForm handleSubmit={handleLogin} error={loginError} setError={setLoginError} />
        </>
    )
  }
  
  export default LoginPage