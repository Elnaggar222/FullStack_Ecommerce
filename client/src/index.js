import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AllReducers from "./Store/AllReducers";
import { applyMiddleware, compose, createStore } from "redux";
import "react-toastify/dist/ReactToastify.css";
import {
  cartMiddleware,
  userMiddleware,
} from "./MiddleWares/cookieMiddlewares.js";
import { cartTypes, userTypes } from "./Store/AllTypes";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  AllReducers,
  composeEnhancers(applyMiddleware(userMiddleware, cartMiddleware))
);
store.dispatch({ type: cartTypes.INITIALIZE_APP_CART });
store.dispatch({ type: userTypes.INITIALIZE_APP_USER });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
