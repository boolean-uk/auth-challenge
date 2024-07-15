import { Link } from "react-router-dom";
import '../../styling/dashboard.css'

export default function Dashboard() {
    return (
        <div className="dashboard_container">
            <main className="dashboard_main">
                <h2>
                    Welcome to Good Films! The app to log all your favourite films.
                </h2>
                <div className="button_box">
                    <Link to="/register">
                        <input 
                         type="button"
                         id="register"
                         name="register"
                        className="button"
                        value="Register"/>
                    </Link>
                    <Link to="/login">
                        <input
                        type="button"
                        id="login"
                        name="login"
                        className="button"
                        value="Login"
                        />
                    </Link>
                </div>
            </main>
        </div>
    )
}