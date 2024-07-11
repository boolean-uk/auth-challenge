import { Link } from "react-router-dom";
import '../../styling/dashboard.css'
import filmreel from '../../assets/svg/filmreel.svg'

export default function Dashboard() {

    return (
        <div className="dashboard_container">
            <header className="dashboard_header">
                <h1>
                    Good Films
                </h1>
                <img
                src={filmreel}
                alt="film reel icon"
                id="filmreel"
                className="icon"/>          
            </header>
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