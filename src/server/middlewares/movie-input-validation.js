const hasTitle = (title) => title && title.length;
const hasDescription = (description) => description && description.length;
const hasRuntimeMins = (runtimeMins) => runtimeMins && !!Number(runtimeMins);

const validateInput = (movie) => {
  const { title, description, runtimeMins } = movie;

  return (
    hasTitle(title) &&
    hasDescription(description) &&
    hasRuntimeMins(runtimeMins)
  );
};

export { validateInput };
