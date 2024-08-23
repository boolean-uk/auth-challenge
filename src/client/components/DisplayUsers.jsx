import { useState } from "react";
import { Link } from "react-router-dom";

export default function DisplayUsers() {
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
      fetch(apiUrl + "/movie")
        .then((res) => res.json())
        .then((data) => setMovies(data.movies));
    }, [movieStatus]);

  return (
    <div className="display-users-section">
      <Link to={"/"}>Back</Link>
    </div>
  );
}
