import RegisterUser from "./RegisterUser.jsx";
import LoginUser from "./LogInUser.jsx";

export default function LandingPage() {
    return (        
        <>
        <p>Login to view your Movies list or add a new movie</p>
        <div>
            <LoginUser />
        </div>
        <p>Or, create an account if you dont have one</p>
        <div>
            <RegisterUser />
        </div>
    </>
    )
}