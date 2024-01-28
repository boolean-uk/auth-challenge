export default function Input({
  type,
  value,
  name,
  placeholder,
  handleChange
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={handleChange}
      className="form__input"
    />
  )
}
