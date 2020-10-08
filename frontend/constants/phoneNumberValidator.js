export default isValidPhoneNumber = (phone) => {
  if (phone.match(/^(\+\d{1,3})?\d{10}$/)) {
    return true;
  }
  return false;
};
