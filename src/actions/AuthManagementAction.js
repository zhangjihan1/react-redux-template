import {
    USER_LOGIN,
    USER_LOGOUT
} from "./actionTypes";

export const updateUserLoginStatus = (userInform) => {
    return { type: USER_LOGIN, payload: userInform };
}

export const updateUserLogoutStatus = () => {
    return { type: USER_LOGOUT };
}