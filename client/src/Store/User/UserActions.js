import { userTypes } from "../AllTypes";
export const loginStart = () => {
  return {
    type: userTypes.LOGIN_START,
  };
};
export const loginSuccess = (userInfo) => {
  return {
    type: userTypes.LOGIN_SUCCESS,
    payload: userInfo,
  };
};
export const loginFailure = (errorMessage) => {
  return {
    type: userTypes.LOGIN_FAILURE,
    payload: errorMessage,
  };
};

export const DeleteUser = () => {
  return {
    type: userTypes.DELETE_USER,
  };
};
