import {
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_ERROR
} from "../types/types";

function getUser() {
  let user = localStorage.getItem('user');
  return  user ? JSON.parse(user) : {};
}

const loginReducer = (state = getUser(), action) => {  
    switch (action.type) {
      case REQUEST_LOGIN_SUCCESS:
        return {
          loggedIn: true,
          user : action.user
        }
      case REQUEST_LOGIN_ERROR:
        return { }
      default:
        return state
    }
  }
  
  export default loginReducer