import axios from 'axios'
import history from '../history'

const initialState = [];

// Action types
const GET_PRODUCTS = "GET_PRODUCTS";

// Action creators
function _getProducts(products) {
  return ({
      type: GET_PRODUCTS,
      products
  })
};

// Thunk creators
export function getProductsThunkCreator() { 
  try {
    return async (dispatch) => {
      const { data } = await axios.get('api/products');
      dispatch(_getProducts(data));
    }
  } catch(err) {
      console.log('Error inside getProductsThunkCreator: ', err)
  }
};

export default function(state = initialState, action) {
    switch (action.type) {
      case GET_PRODUCTS:
        return action.products
      default:
        return state
    }
  };
  
