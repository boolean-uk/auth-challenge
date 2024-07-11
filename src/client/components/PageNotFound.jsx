import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <main id="page-not-found">
      <h1>Page not found</h1>

      <span>
        You can go back<Link to={"/"}>here.</Link>
      </span>
    </main>
  );
}
