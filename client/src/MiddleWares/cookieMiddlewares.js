import Cookies from "js-cookie";
import { cartTypes, userTypes } from "../Store/AllTypes";

export const cartMiddleware = (store) => (next) => (action) => {
  let cartData = null;
  const result = next(action);
  if (action.type === cartTypes.ADD_PRODUCT) {
    Cookies.set("cartData", JSON.stringify(store.getState().cartState));
  } else if (action.type === cartTypes.INITIALIZE_APP_CART) {
    if (Cookies.get("cartData")) {
      cartData = JSON.parse(Cookies.get("cartData"));
      store.dispatch({ type: cartTypes.LOAD_CART_DATA, payload: cartData });
    }
  } else if (action.type === cartTypes.CLEAR_CART) {
    Cookies.set("cartData", "");
  }
  return result;
};

export const userMiddleware = (store) => (next) => (action) => {
  let userData = null;
  const result = next(action);
  if (
    action.type === userTypes.LOGIN_SUCCESS ||
    action.type === userTypes.LOGIN_FAILURE
  ) {
    Cookies.set("userData", JSON.stringify(store.getState().userState));
  } else if (action.type === userTypes.INITIALIZE_APP_USER) {
    if (Cookies.get("userData")) {
      userData = JSON.parse(Cookies.get("userData"));
      store.dispatch({ type: userTypes.LOAD_USER_DATA, payload: userData });
    }
  } else if (action.type === userTypes.DELETE_USER) {
    Cookies.set("userData", "");
  }
  return result;
};
