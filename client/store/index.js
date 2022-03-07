import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import allProductsReducer from "./allProducts";
import oneProductReducer from "./SingleProduct";
import allUsersReducer from "./adminDash";
import cartReducer from "./cart.js";

const reducer = combineReducers({
  auth,
  products: allProductsReducer,
  product: oneProductReducer,
  users: allUsersReducer, 
  cart: cartReducer
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
