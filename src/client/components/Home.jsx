import Logout from "./Logout"
import UserForm from "./UserForm"

function Home() {

    return (
        <>
            <Logout setLogoutMessage={setLogoutMessage} />
            {logoutMessage && <p className='logout-message'>{logoutMessage}</p>}

            <h1>Register</h1>
            <UserForm handleSubmit={handleRegister} />
            {registerMessage && <p>{registerMessage}</p>}

            <h1>Login</h1>
            <UserForm handleSubmit={handleLogin} />
            {loginMessage && <p>{loginMessage}</p>}
        </>
    )
}

export default Home