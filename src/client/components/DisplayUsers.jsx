import { useState, useEffect, useContext } from "react";
import { appContext } from "../App";
import { Link } from "react-router-dom";
import UserItem from "./UserItem";

export default function DisplayUsers() {
  const { apiUrl } = useContext(appContext);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetch(apiUrl + "/user")
      .then((res) => res.json())
      .then((data) => setAllUsers(data.users))
  }, []);

  return (
    <div className="display-users-section">
      <Link to={"/"}>Back</Link>
      <h1>Registered Users</h1>
      <ul>
        {allUsers.map((user, index) => {
          return <UserItem key={index} user={user} setAllUsers={setAllUsers} allUsers={allUsers}/>;
        })}
      </ul>
    </div>
  );
}
