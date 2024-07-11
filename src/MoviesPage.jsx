/* eslint-disable react/prop-types */
export default function MoviesPage({user}) {
  return (
    <div className="grid place-items-center">
      <h1 className="text-4xl my-4">The Boolean Movie Database</h1>
      <p>Welcome {`${user.username}`}!</p>
    </div>
  );
}
