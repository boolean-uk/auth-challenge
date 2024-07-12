/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import AdminDashElement from "./AdminDashElement";
import url from "../utils/baseurl";

export default function AdminDashboard( {loggedInUser} ) {
  const [users, setUsers] = useState([]);

  async function getAllUsers() {
    const data = await fetch(`${url}/user/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    const json = await data.json();
    setUsers(json.users);
  }
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <section>
      <ul className="bg-slate-200 p-4 rounded-md">
        {users.length === 1 && <p>No registered users</p>}
        {users.map((user, index) => {
            if (user.username === loggedInUser.username) {
                return
            }
          return (
            <AdminDashElement key={`admin${index}`} user={user} getAllUsers={getAllUsers} />
          );
        })}
      </ul>
    </section>
  );
}
