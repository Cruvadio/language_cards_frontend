import {isLogged} from "./auth_reducer";
import {loadLanguages} from "./common_reducer";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../store";

const INITIALIZE = 'app_reducer/INITIALIZE';

type InitialStateType = {
    isInitialized: boolean
}

const initialState : InitialStateType = {
    isInitialized: false
}

type SetInitializedActionType = {
    type: typeof INITIALIZE
}


const appReducer = (state = initialState, action : any): InitialStateType => {
    switch (action.type) {
        case INITIALIZE:
            return {
                ...state,
                isInitialized: true
            }
        default:
            return state;

    }
}


export const setInitialized = () :SetInitializedActionType => ({type: INITIALIZE})


export const initialize =  () : ThunkAction<Promise<void>, RootState, any, SetInitializedActionType> =>
    async (dispatch ) => {
    let promises = [
        dispatch(isLogged()),
        dispatch(loadLanguages()),
    ]
    await Promise.all(promises);
    dispatch(setInitialized());

}


export default appReducer;
