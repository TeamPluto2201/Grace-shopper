import axios from 'axios';


const initialState = [];

// Action types
const GET_USERS = 'GET_USERS';

// Action creators
const _getUsers = (users) => {
    return ({
        type: GET_USERS,
        users
    });
};

// Thunk creators
export function getUsersThunkCreator() {
    console.log('inside getUsersThunkCreator...')
    try {
        return async (dispatch) => {
            const { data } = await axios.get('api/users');
            dispatch(_getUsers(data));
        };
    } catch (err) {
        console.log('Error inside getUsersThunkCreator: ', err)
    };
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_USERS:
            return action.users;
        default:
            return state;
    };
};
