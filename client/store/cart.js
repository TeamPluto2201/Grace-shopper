import axios from "axios";
import history from "../history";

const initialState = [];
//should be an array of orderEntries

// Action types
// const GET_ORDER_ENTRY = "GET_ORDER_ENTRY";
const GET_ORDER_ENTRIES = "GET_ORDER_ENTRIES";
const ADD_ORDER_ENTRY = "ADD_ORDER_ENTRY";
const UPDATE_ORDER_ENTRY = "UPDATE_ORDER_ENTRY";
const DELETE_ORDER_ENTRY = "DELETE_ORDER_ENTRY";

// Action creators
// function _getOrderEntry(orderEntry) {
//   return {
//     type: GET_ORDER_ENTRY,
//     orderEntry,
//   };
// }
function _getOrderEntries(orderEntries) {
  return {
    type: GET_ORDER_ENTRIES,
    orderEntries,
  };
}

function _addOrderEntry(orderEntry) {
  return {
    type: ADD_ORDER_ENTRY,
    orderEntry,
  };
}

function _updateOrderEntry(orderEntry) {
  return {
    type: UPDATE_ORDER_ENTRY,
    orderEntry,
  };
}

function _deleteOrderEntry(orderEntry) {
  return {
    type: DELETE_ORDER_ENTRY,
    orderEntry,
  };
}

// Thunk creators
export function getOrderEntriesThunkCreator() {
  try {
    return async (dispatch) => {
      // First retrieve the user's token
      const token = window.localStorage.getItem("token");

      // If the token exists, put it on our header. Then, we can use the
      // token in our "me" route to send back the user.
      if (token) {
        // JOE CR: This request does not seem necessary, as you probably have the information
        // you want from the "auth" key on the Redux store. Resourceful, though!
        const { data } = await axios.get("/auth/me", {
          headers: {
            authorization: token,
          },
        });

        // The userData that we just retrieved will contain the user Id that
        // we will put as a wildcard parameter on the route below, which will
        // retrieve all orderEntries so we can render this specific user's cart.
        console.log("userData__________", data);
        // JOE CR: Sending this request with the token would be ideal.
        const response = await axios.get(`/api/cart/${data.id}`);
        dispatch(_getOrderEntries(response.data));
      }

      // Right now this only works for logged in users, so we need to discuss
      // how to handle guests.
    };
  } catch (err) {
    console.log("Error inside getOrderEntriesThunkCreator: ", err);
  }
}

export function addOrderEntryThunkCreator(entryToCreate) {
  try {
    return async (dispatch) => {
      const { data } = await axios.post("/api/orderEntries", entryToCreate);
      dispatch(_addOrderEntry(data));
    };
  } catch (err) {
    console.log("Error inside addOrderEntryThunkCreator: ", err);
  }
}

export function updateOrderEntryThunkCreator(entryToUpdate) {
  try {
    return async (dispatch) => {
      const { data } = await axios.put(
        `/api/orderEntries/${entryToUpdate.id}`,
        entryToUpdate
      );
      dispatch(_updateOrderEntry(data));
    };
  } catch (err) {
    console.log("Error inside updateOrderEntryThunkCreator", err);
  }
}

export function deleteOrderEntryThunkCreator(entryToDelete) {
  try {
    return async (dispatch) => {
      const { data } = await axios.delete(
        `/api/orderEntries/${entryToDelete.id}`
      );
      dispatch(_deleteOrderEntry(data));
    };
  } catch (err) {
    console.log("Error inside deleteOrderEntryThunkCreator", err);
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_ENTRIES:
      console.log(state)
      return [...action.orderEntries];

    case ADD_ORDER_ENTRY:
      return [...state, action.orderEntry];

    // I believe that the UPDATE and DELETE cases should both return an object
    // instead of an array, but I didn't know how to test/confirm so this may need to be changed.
    // JOE CR: If this slice of Redux state nominally represents an array, then it should always
    // be returning an array and not an object.
    case UPDATE_ORDER_ENTRY:
      return { ...state, ...action.orderEntry };

    case DELETE_ORDER_ENTRY:
      return { ...state, ...action.orderEntry };

    default:
      return state;
  }
}
