import axios from "axios";
import history from "../history";

const initialState = {};

// Action types
const GET_PRODUCT = "GET_PRODUCT";

// Action creators
function _getProduct(product) {
  return {
    type: GET_PRODUCT,
    product,
  };
}

// Thunk creators
export function getProductThunkCreator(id) {
  try {
    return async (dispatch) => {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch(_getProduct(data));
    };
  } catch (err) {
    console.log("Error inside getProductsThunkCreator: ", err);
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
