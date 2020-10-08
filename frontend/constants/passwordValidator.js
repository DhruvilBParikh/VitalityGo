export default isValidPassword = (password) => {
  if (password.length < 8 || password.length > 16) {
    return false;
  }
  return true;
};
