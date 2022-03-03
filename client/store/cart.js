import axios from 'axios'
import history from '../history'

const initialState = [];
//should be an array of orderEntries
//orderEntries need to be

// Action types
const GET_ORDER_ENTRIES = "GET_ORDER_ENTRIES";

// Action creators
function _getOrderEntries(orderEntries) {
    return ({
        type: GET_ORDER_ENTRIES,
        orderEntries
    })
};

// Thunk creators
export function getOrderEntriesThunkCreator() {
    try {
        return async (dispatch) => {
            const { data } = await axios.get('api/orderEntries');
            dispatch(_getOrderEntries(data));
        }
    } catch (err) {
        console.log('Error inside getProductsThunkCreator: ', err)
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ORDER_ENTRIES:
            return action.orderEntries
        default:
            return state
    }
};

