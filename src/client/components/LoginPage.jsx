import UserForm from "./UserForm"
import { useContext } from "react"
import { DataContext } from "../App"

function LoginPage() {
    const { handleLogin, loginError, setLoginError, } = useContext(DataContext)

    return (
        <div className="main">
            <h2>Login</h2>
            <UserForm handleSubmit={handleLogin} error={loginError} setError={setLoginError} />
        </div>

    )
  }
  
  export default LoginPage