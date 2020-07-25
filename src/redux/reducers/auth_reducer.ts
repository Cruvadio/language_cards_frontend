import {userAPI} from '../../api/api'
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {ActionType, RootState} from "../store";

const SET_USER_DATA = 'auth_reducers/SET_USER_DATA';
const SET_AUTHENTICATE = 'auth_reducers/SET_AUTHENTICATE';
const LOG_OUT = 'auth_reducers/LOG_OUT';
const SET_NEW_USER = 'auth_reducers/SET_NEW_USER';

const initialState = {
    currentUser: {
        userID: null as number | null,
        email: null as string | null,
        login: null as string | null,
    },
    isAuthenticate: false,

    isNewUser: false,
}

type InitialStateType = typeof initialState

type currentUserType = typeof initialState.currentUser

type Actions = ActionType<typeof actions>
const authReducer = (state = initialState, action: Actions) : InitialStateType => {
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
            return {
                ...state,
                currentUser: {
                    userID: null,
                    email: null,
                    login: null,
                },
                isAuthenticate: false,
            }
        case SET_NEW_USER:
            return {
                ...state,
                isNewUser: action.isNewUser,
            }
        default:
            return state;

    }
}

export const actions = {
    setUserData: (currentUser : currentUserType) => ({type: SET_USER_DATA, data: currentUser} as const),
    setAuthenticate: (isAuth: boolean) => ({type: SET_AUTHENTICATE, isAuthenticate: isAuth} as const),
    logOut: () => ({type: LOG_OUT} as const),
    setIsNewUser: (isNewUser: boolean)  => ({type: SET_NEW_USER, isNewUser} as const),
}



type ThunkActionType = ThunkAction<Promise<void>, RootState, any, Actions>


export const loginUser = (username : string, password : string) : ThunkActionType => {
    return (dispatch : Function) => {

        return userAPI.loginUser({username, password})
            .then(
                response => {
                    console.log(response);
                    localStorage.setItem("refresh", response.refresh);
                    localStorage.setItem("access", response.access);
                    dispatch(isLogged());
                }
            )
            .catch(
                error => {
                    console.log(error.response)
                    dispatch(stopSubmit("login", {_error: error.response.data.detail}))
                }
            )
    }
}

export const createUser = (username: string,
                           email: string,
                           last_name : string,
                           first_name : string,
                           password : string) : ThunkActionType => async (dispatch ) => {

    try{
        let response = await userAPI.createNewUser(username, email, last_name, first_name, password)
        await dispatch(loginUser(username, password));
        dispatch(actions.setIsNewUser(true));
    } catch (e) {
        if (e.response.status === 400){
            dispatch(stopSubmit("registration/signup", e.response.data))
        }
    }
}

export const isLogged = () : ThunkActionType => async (dispatch) => {
    if (!localStorage.access) return Promise.resolve();
    try {
        let response = await userAPI.isLoggedIn()
        console.log(response);
        dispatch(actions.setUserData({
            userID: response.id,
            email: response.email,
            login: response.username,
        }))
        dispatch(actions.setAuthenticate(true));

    } catch (error) {

        dispatch(actions.setAuthenticate(false));
        if (error.response.status === 401) {
            dispatch(refreshToken())
        } else {
            console.log(error.response);
            localStorage.removeItem("refresh");
            localStorage.removeItem("access");

        }
    }
}

export const refreshToken = () : ThunkActionType => async (dispatch : Function) => {
    try {
        let data = await userAPI.refreshToken()
        console.log(data);
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        dispatch(isLogged());
    } catch (error) {
        console.log(error.response);
        localStorage.removeItem("refresh");
        localStorage.removeItem("access");
    }
}

export const userLogOut = () : ThunkActionType => async (dispatch : Function) => {
    if (!localStorage.refresh) return;
    try {
        await userAPI.blacklistToken()

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        dispatch(actions.logOut());
    } catch (error) {
        console.log(error.response);
    }
}


export default authReducer;