export default isValidEmail = (email) => {
  if (email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    return true;
  }
  return false;
};
