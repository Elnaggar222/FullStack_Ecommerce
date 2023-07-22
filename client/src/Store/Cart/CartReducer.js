import Cookies from "js-cookie";
import { cartTypes } from "../AllTypes";

const initialState = {
  products_count: 0,
  products: [],
  total_price: 0,
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartTypes.ADD_PRODUCT:
      return {
        ...state,
        products_count: state.products_count + 1,
        products: [...state.products, action.payload],
        total_price:
          state.total_price + action.payload.price * action.payload.quantity,
      };
    case cartTypes.LOAD_CART_DATA:
      return {
        ...state,
        products_count: action.payload.products_count,
        products: action.payload.products,
        total_price: action.payload.total_price,
      };
    case cartTypes.CLEAR_CART:
      return {
        products_count: 0,
        products: [],
        total_price: 0,
      };
    default:
      return state;
  }
};

export default CartReducer;
