export default function Movie({ id, title, description, runtimeMins }) {
  return (
    <li key={id}>
      <h3>{title}</h3>
      <p>Description: {description}</p>
      <p>Runtime: {runtimeMins}</p>
    </li>
  );
}
