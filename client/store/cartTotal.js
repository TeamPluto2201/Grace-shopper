import axios from "axios";
import history from "../history";
import store from "./index.js";

const initialState = 0;
//should be an array of orderEntries

// Action types
// const GET_ORDER_ENTRY = "GET_ORDER_ENTRY";
const GET_ORDER_ENTRIES_TOTAL = "GET_ORDER_ENTRIES_TOTAL";

function _getOrderEntriesTotal(orderEntries) {
  return {
    type: GET_ORDER_ENTRIES_TOTAL,
    orderEntries,
  };
}

// Thunk creators
export function getOrderEntriesTotalThunkCreator() {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(`/api/cart`, { headers: { authorization: token } });
        dispatch(_getOrderEntriesTotal(response.data));
      }
      catch (err) {
        console.log("Error inside getOrderEntriesThunkCreator: ", err);
      }
    }
  }
}


export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_ENTRIES_TOTAL:
    let total = 0
      action.orderEntries.map((entry) => total += entry.product.price * entry.QTY)
      return total;
    default:
      return state;
  }
}