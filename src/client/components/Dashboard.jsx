import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const checkTokenAndLoadUsers = () => {
    const token = localStorage.getItem("jwt");

    if (token === null) {
      setIsTokenValid(false);
      return;
    }

    fetch("http://localhost:4000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 500) {
          setIsTokenValid(false);
          return;
        }
        if (res.status === 403) {
          setIsAdmin(false);
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.users) {
          setUsers(data.users);
        }
      });
  };

  useEffect(() => {
    checkTokenAndLoadUsers();
  }, []);

  const handleDeleteClick = (id) => {
    const token = localStorage.getItem("jwt");
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));

    fetch("http://localhost:4000/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        id: id,
      }),
    }).then(() => {
      checkTokenAndLoadUsers();

      if (decoded.id === id) {
        navigate("/register");
      }
    });
  };

  const handleSearchBarChange = (e) => {
    const { value } = e.target;

    setSearchInput(value);
  };

  if (!isTokenValid) {
    return (
      <section id="token-not-valid">
        In order to access this page you need an account.
        <span>
          <Link to={"/register"} id="register-link">
            Register
          </Link>
          |
          <Link to={"/login"} id="login-link">
            Log in
          </Link>
        </span>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <span id="not-admin">
        Access denied: Admins only. <Link to={"/"}>&larr; Go back</Link>
      </span>
    );
  }

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <main id="user-list">
      <span id="user-go-back">
        <Link to={"/"}>&larr; Go back</Link>
      </span>

      <div id="search-user-bar">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
          type="search"
          name="search-movie"
          placeholder="Search..."
          value={searchInput}
          onChange={handleSearchBarChange}
        />
      </div>

      <h1>User list</h1>

      {users && users.length > 0 && (
        <section id="users">
          {filteredUsers.map((user) => (
            <div key={user.id} id="user">
              <div id="user-id">
                <h2>Id</h2>
                <span>{user.id}</span>
                <FontAwesomeIcon
                  onClick={() => handleDeleteClick(user.id)}
                  id="icon-remove-user"
                  icon={faXmark}
                />
              </div>

              <div id="user-username">
                <h2>Username</h2>
                <span>{user.username}</span>
              </div>

              {user.movies.length > 0 && (
                <>
                  <h2>Movies</h2>
                  {user.movies.map((movie) => (
                    <div key={movie.id} id="user-movies-title">
                      <span>{movie.title}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </section>
      )}

      {filteredUsers.length === 0 && (
        <p style={{ textAlign: "center" }}>No user was found.</p>
      )}

      {users && users.length === 0 && (
        <span>No users have created an account yet.</span>
      )}
    </main>
  );
}
