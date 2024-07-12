/* eslint-disable react/prop-types */
export default function AdminDashElement({ user, getAllUsers }) {

  async function handleClick() {
    await fetch(`http://localhost:3000/user/${user.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    getAllUsers()
  }

  return (
    <li className="flex flex-row justify-between w-80">
      <p>User: {user.username}</p>
      <button onClick={handleClick} className="text-red-500">
        Delete
      </button>
    </li>
  );
}
