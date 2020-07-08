import {userAPI} from '../../api/api'

const SET_USER_DATA = 'SET_USER_DATA';
const SET_AUTHENTICATE = 'SET_AUTHENTICATE';
const LOG_OUT = 'LOG_OUT';

const initialState = {
    currentUser: {
        userID: null,
        email: null,
        login: null,
    },
    isAuthenticate: false,
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                currentUser: action.data,
            }
        case SET_AUTHENTICATE:
            return {
                ...state,
                isAuthenticate: action.isAuthenticate,
            }
        case LOG_OUT:
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            return {
                ...state,
                currentUser: {
                    userID: null,
                    email: null,
                    login: null,
                },
                isAuthenticate: false,
            }
        default:
            return state;

    }
}


export const setUserData = (currentUser) => ({type: SET_USER_DATA, data: currentUser})
export const setAuthenticate = (isAuth) => ({type: SET_AUTHENTICATE, isAuthenticate: isAuth})
export const logOut = () => ({type: LOG_OUT})


export const loginUser = (username, password) => {
    return dispatch => {

        userAPI.loginUser({username, password})
            .then(
                response => {
                    console.log(response);
                    localStorage.setItem("refresh", response.refresh);
                    localStorage.setItem("access", response.access);
                    dispatch(isLogged());
                }
            )
            .catch(error => console.log(error))
    }
}

export const isLogged = () => dispatch => {
    if (!localStorage.access) return;
    userAPI.isLoggedIn()
        .then(
            response => {
                console.log(response);
                dispatch(setUserData({
                    userID: response.id,
                    email: response.email,
                    login: response.username,
                }))
                dispatch(setAuthenticate(true));
            }
        ).catch(
        error => {
            dispatch(setAuthenticate(false));
            if (error.response.status === 401) {
                dispatch(refreshToken())
            }
            else {
                localStorage.removeItem("refresh");
                localStorage.removeItem("access");

            }
        }

    )
}

export const refreshToken = () => dispatch => {
    userAPI.refreshToken().then(
        data => {
            localStorage.setItem("access", data.access);
            dispatch(isLogged())
        }
    )
        .catch(error=> {
            localStorage.removeItem("refresh");
            localStorage.removeItem("access");
    })
}

export default authReducer;