import axios from "axios";
import history from "../history";
import { DELETE_PRODUCT, CREATE_PRODUCT } from "./SingleProduct";

const initialState = [];

// Action types
const GET_PRODUCTS = "GET_PRODUCTS";

// Action creators
function _getProducts(products) {
  return {
    type: GET_PRODUCTS,
    products,
  };
}

// Thunk creators
export function getProductsThunkCreator() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("api/products");
      dispatch(_getProducts(data));
    } catch (err) {
      console.log("Error inside getProductsThunkCreator: ", err);
    }
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;

    case CREATE_PRODUCT:
      return [...state, action.product];

    case DELETE_PRODUCT:
      return state.filter((element) => {
        return element.id !== action.product.id;
      });
    default:
      return state;
  }
}
