import { userTypes } from "../AllTypes";

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.LOGIN_START:
      return {
        ...state,
        isLoading: true,
      };
    case userTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload,
        error: null,
      };
    case userTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        currentUser: null,
        error: action.payload,
      };
    case userTypes.LOAD_USER_DATA:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        currentUser: action.payload.currentUser,
        error: action.payload.error,
      };
    case userTypes.DELETE_USER:
      return {
        currentUser: null,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
