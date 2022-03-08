import axios from "axios";

const initialState = [];

// Action types
const GET_USERS = "GET_USERS";
const MAKE_ADMIN = "MAKE_ADMIN";

// Action creators
const _getUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  };
};

const _makeAdmin = (user) => {
  return {
    type: MAKE_ADMIN,
    user,
  };
};

// Thunk creators
export function getUsersThunkCreator() {
  return async (dispatch) => {
    try {
      //first retrieve the users token from localstorage
      const token = window.localStorage.getItem("token");
      console.log("TOKEN -->", token);

      //make an axios get request to '/api/users'.
      //make sure to set the header with the token, so that the route
      // can use it to authenticate in the server
      const { data } = await axios.get("/api/users", {
        headers: {
          authorization: token,
        },
      });
      dispatch(_getUsers(data));
    } catch (err) {
      console.log("Error inside getUsersThunkCreator: ", err);
    }
  };
}

export function makeAdminThunkCreator(user) {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/users/${user.id}`);
      console.log("DATA >>>>", data);
      dispatch(_makeAdmin(data));
    } catch (err) {
      console.log("Error inside makeAdminThunkCreator: ", err);
    }
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case MAKE_ADMIN:
      return state.map((element) => {
        if (element.id === action.user.id) return action.user;
        else return element;
      });
    default:
      return state;
  }
}
