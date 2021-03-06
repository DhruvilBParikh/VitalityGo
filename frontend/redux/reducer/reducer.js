import { RESTORE_USER, SIGN_IN, SIGN_OUT, EDIT_PROFILE } from "../action/actionTypes";

const initialState = {
  isSignout: false,
  type: null,
  token: null,
  userData: null,
  patientData: null,
  doctorData: null,
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
        userData: action.payload.userData,
        type: action.payload.type,
        token: action.payload.token,
        userData: action.payload.userData,
        patientData: action.payload.patientData,
        doctorData: action.payload.doctorData,
      };
    case SIGN_OUT:
      console.log("Action type: SIGN_OUT");
      return {
        ...state,
        isSignout: true,
        type: null,
        token: null,
        userData: null,
        patientData: null,
        doctorData: null,
      };
      case EDIT_PROFILE:
        console.log("Action type: EDIT_PROFILE");
        return {
          ...state,
          patientData: {
            ...state.patientData,
            caloriesGoal: action.payload.caloriesGoal,
            waterGoal: action.payload.waterGoal,
            Data: {
              ...state.patientData.Data,
              height: action.payload.height,
              weight: action.payload.weight
            },
          }
        }
    default:
      return state;
  }
};

export default reducer;
