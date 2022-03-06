import axios from "axios";
import history from "../history";

const initialState = {};

// Action types
const GET_PRODUCT = "GET_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

// Action creators
function _getProduct(product) {
  return {
    type: GET_PRODUCT,
    product,
  };
};

function _createProduct(product) {
  return {
    type: CREATE_PRODUCT,
    product
  };
};

function _deleteProduct(product) {
  return {
    type: DELETE_PRODUCT,
    product
  };
};

// Thunk creators
export function getProductThunkCreator(id) {
  try {
    return async (dispatch) => {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch(_getProduct(data));
    };
  } catch (err) {
    console.log("Error inside getProductsThunkCreator: ", err);
  };
};

export function createProductThunkCreator(product) {
  try {
    return async (dispatch) => {
      const { data } = await axios.post('/api/products', product);
      dispatch(_createProduct(data));
    };
  } catch(err) {
    console.log("Error inside createProductThunkCreator: ", err)
  };
};

export function deleteProductThunkCreator(id) {
  try {
    return async (dispatch) => {
      const { data } = await axios.delete(`/api/products/${id}`);
      dispatch(_deleteProduct(data));
    }
  } catch (err) {
      console.log("Error inside deleteProductThunkCreator: ", err);
  };
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product;
    case CREATE_PRODUCT:
      return {...state, ...action.product}
    case DELETE_PRODUCT:
      return {...state, ...action.product}
    default:
      return state;
  };
};
