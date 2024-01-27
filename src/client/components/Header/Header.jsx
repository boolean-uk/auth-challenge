import "./index.css";
import { Link } from "react-router-dom";
import userIcon from "../../assets/user-icon.svg";

export default function Header() {
  return (
    <header>
      <h1>
        <Link to="/" className="home--link">
          Movies
        </Link>
      </h1>
      <Link to="/login" className="user-login--link">
        <img src={userIcon} alt="user-icon" width={20} />
      </Link>
    </header>
  );
}
