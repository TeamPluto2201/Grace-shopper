import axios from 'axios'
import history from '../history'

const initialState = [];
//should be an array of orderEntries


// Action types
const GET_ORDER_ENTRIES = "GET_ORDER_ENTRIES";
const ADD_ORDER_ENTRY = "ADD_ORDER_ENTRY";

// Action creators
function _getOrderEntries(orderEntries) {
    return ({
        type: GET_ORDER_ENTRIES,
        orderEntries
    })
};

function _addOrderEntry(orderEntry) {
    return ({
        type: ADD_ORDER_ENTRY,
        orderEntry
    })
};


// Thunk creators
export function getOrderEntriesThunkCreator() {
    try {
        return async (dispatch) => {
            const { data } = await axios.get('/api/orderEntries');
            dispatch(_getOrderEntries(data));
        }
    } catch (err) {
        console.log('Error inside getProductsThunkCreator: ', err)
    }
};

export function addOrderEntryThunkCreator(entryToCreate) {
    try {
        return async (dispatch) => {
            const { data } = await axios.post('/api/orderEntries', entryToCreate);
            dispatch(_addOrderEntry(data));
        }
    } catch (err) {
        console.log('Error inside addOrderEntryThunkCreator: ', err)
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ORDER_ENTRIES:
            return action.orderEntries;

        case ADD_ORDER_ENTRY:
            return [...state, action.orderEntry]

        default:
            return state
    }
};

