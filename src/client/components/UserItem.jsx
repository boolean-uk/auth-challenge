import { useContext } from "react";
import { appContext } from "../App";

export default function UserItem({ user, setAllUsers, allUsers }) {
  const { apiUrl } = useContext(appContext);

  const deleteUser = async (id) => {
    console.log(id);

    const response = await fetch(apiUrl + `/user/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setAllUsers(allUsers.filter((user) => user.id !== id));
      console.log("User deleted successfully");
    } else {
      console.error("Error deleting user");
    }
  };

  return (
    <li>
      <h3>{user.username}</h3>
      <button type="button" id={user.id} onClick={() => deleteUser(user.id)}>
        Delete User
      </button>
    </li>
  );
}
