import axios from "axios";
import history from "../history";
import store from "./index.js";

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
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(`/api/cart`, { headers: { authorization: token } });
        dispatch(_getOrderEntries(response.data));
      }
      catch (err) {
        console.log("Error inside getOrderEntriesThunkCreator: ", err);
      }
    }
  }

  // Right now this only works for logged in users, so we need to discuss
  // how to handle guests.
}

export function addOrderEntryThunkCreator(entryToCreate) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/orderEntries", entryToCreate);
      dispatch(_addOrderEntry(data));
    }
    catch (err) {
      console.log("Error inside addOrderEntryThunkCreator: ", err);
    }
  };
}

export function updateOrderEntryThunkCreator(entryToUpdate) {

  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `/api/orderEntries/${entryToUpdate.id}`,
        entryToUpdate
      );
      dispatch(_updateOrderEntry(data));
    }
    catch (err) {
      console.log("Error inside updateOrderEntryThunkCreator", err);
    };
  }
}

export function deleteOrderEntryThunkCreator(entryToDelete) {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/api/orderEntries/${entryToDelete}`
      );
      dispatch(_deleteOrderEntry(data));
    }
    catch (err) {
      console.log("Error inside deleteOrderEntryThunkCreator", err);
    }
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_ENTRIES:
      // console.log(state)
      return [...action.orderEntries];

    case ADD_ORDER_ENTRY:
      return [...state, action.orderEntry];

    // below cases need to use .filter
    case UPDATE_ORDER_ENTRY:
      // return [...state, ...action.orderEntry];
      // return state.filter(orderEntry => { return orderEntry.id !== action.orderEntry.id }).concat(action.orderEntry)
      return [...(state.filter(orderEntry => { return orderEntry.id !== action.orderEntry.id })), action.orderEntry]

    case DELETE_ORDER_ENTRY:
      // return [...state, ...action.orderEntry];
      return state.filter(orderEntry => { return orderEntry.id !== action.orderEntry.id })

    default:
      return state;
  }
}
