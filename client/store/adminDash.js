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
    try {
        return async (dispatch) => {
            //first retrieve the users token from localstorage
            const token = window.localStorage.getItem('token')

            //make an axios get request to '/api/users'.
            //make sure to set the header with the token, so that the route
            // can use it to authenticate in the server
            const { data } = await axios.get('/api/users', {
                headers: {
                    authorization: token
                }
            })
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
