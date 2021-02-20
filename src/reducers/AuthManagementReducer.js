import {
    USER_LOGIN,
    USER_LOGOUT
} from "../actions/actionTypes";
import AuthManagementStore from "../store/AuthManagementStore";

const AuthManagementReducer = (state = AuthManagementStore, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state, ...{ isAuthenticated: true, ...action.payload }
            };
        case USER_LOGOUT:
            return {
                ...state, ...{ isAuthenticated: false, username: null, email: null }
            };
        default:
            return state;
    }
}

export default AuthManagementReducer;