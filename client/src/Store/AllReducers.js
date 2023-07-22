import CartReducer from "./Cart/CartReducer";
import userReducer from "./User/UserReducer";
import { combineReducers } from "redux";
const AllReducers = combineReducers({
  cartState: CartReducer,
  userState: userReducer,
});
export default AllReducers;
