import { cartTypes } from "../AllTypes";
export const addProduct = (newProduct) => {
  return {
    type: cartTypes.ADD_PRODUCT,
    payload: newProduct,
  };
};
export const clearCart = () => {
  return {
    type: cartTypes.CLEAR_CART,
  };
};
