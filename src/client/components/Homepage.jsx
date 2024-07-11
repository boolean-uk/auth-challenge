import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <main id="homepage">
      <h1>Sections</h1>

      <span>
        <Link to={"/register"}>Register</Link>|<Link to={"/login"}>Log in</Link>
        |<Link to={"/movies"}>Movie list</Link>|
        <Link to={"/dashboard"}>Dashboard</Link>
      </span>
    </main>
  );
}
