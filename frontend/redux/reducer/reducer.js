import { RESTORE_USER, SIGN_IN, SIGN_OUT } from "../action/actionTypes";

const initialState = {
  isSignout: false,
  userData: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RESTORE_USER:
      console.log("Action type: RESTORE_USER");
      return {
        ...state,
        userData: action.userData,
      };
    case SIGN_IN:
      console.log("Action type: SIGN_IN");
      return {
        ...state,
        isSignout: false,
        userData: action.userData,
      };
    case SIGN_OUT:
      console.log("Action type: SIGN_OUT");
      return {
        ...state,
        isSignout: true,
        userData: null,
      };
    default:
      return state;
  }
};

export default reducer;
