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

export function makeAdminThunkCreator(user) {
    try {
        return async (dispatch) => {
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
            //return [...state, ...action.user];
            return state.map((element) => {
                if (element.id === action.user.id) return action.user
                else return element
            })
        default:
            return state;
    };
};
