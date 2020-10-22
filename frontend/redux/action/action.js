import { RESTORE_USER, SIGN_IN, SIGN_OUT } from "./actionTypes";

export const restoreUser = (userData) => {
  return {
    type: RESTORE_USER,
    userData,
  };
};

export const signIn = (userData) => {
  return {
    type: SIGN_IN,
    userData,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};
