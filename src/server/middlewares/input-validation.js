const hasUserName = (username) => username && username.length;

const hasPassword = (password) => password && password.length;

const validateInput = (req) => {
  const { username, password } = req.body;
  return hasUserName(username) && hasPassword(password);
};

export { validateInput };
