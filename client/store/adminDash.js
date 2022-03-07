import axios from 'axios';


const initialState = [];

// Action types
const GET_USERS = 'GET_USERS';
const MAKE_ADMIN = 'MAKE_ADMIN';

// Action creators
const _getUsers = (users) => {
    return ({
        type: GET_USERS,
        users
    });
};

const _makeAdmin = (user) => {
    return ({
        type: MAKE_ADMIN,
        user
    });
};

// Thunk creators
export function getUsersThunkCreator() {
    // JOE CR: These try/catch blocks are in the wrong place.
    // try should be located inside of the returned function to attempt
    // and catch issues with making the axios call itself.
    // Right now, it only applies to handling if the function is correctly returned.
    try {
        return async (dispatch) => {
            //first retrieve the users token from localstorage
            const token = window.localStorage.getItem('token')
            console.log('TOKEN -->', token)

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

export function makeAdminThunkCreator(user) {
    try {
        return async (dispatch) => {
            // JOE CR: This route doesn't use req.body so the second argument is not needed currently.
            const { data } = await axios.put(`/api/users/${user.id}`, user);
            console.log('DATA >>>>', data)
            dispatch(_makeAdmin(data));
        };
    } catch (err) {
        console.log('Error inside makeAdminThunkCreator: ', err)
    }
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_USERS:
            return action.users;
        case MAKE_ADMIN:
            return state.map((element) => {
                if (element.id === action.user.id) return action.user;
                else return element;
            });
        default:
            return state;
    };
};
