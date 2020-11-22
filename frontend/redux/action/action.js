import { RESTORE_USER, SIGN_IN, SIGN_OUT, EDIT_PROFILE } from "./actionTypes";

export const restoreUser = (userData) => {
  return {
    type: RESTORE_USER,
    userData,
  };
};

export const signIn = (data) => {
  return {
    type: SIGN_IN,
    payload: {
      type: data.type,
      token: data.token,
      userData: data.userData,
      patientData: data.patientData,
      doctorData: data.doctorData,
    },
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};


export const editProfile = (data) => {
  return {
    type: EDIT_PROFILE,
    payload: data
  }
}