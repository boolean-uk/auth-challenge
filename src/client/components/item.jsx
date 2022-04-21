function Item(props) {
  const { type, placeholder, name, value, handleChange } = props;
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={handleChange}
    />
  );
}

export default Item;
