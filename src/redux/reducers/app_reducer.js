import {isLogged} from "./auth_reducer";
import {loadLanguages} from "./common_reducer";

const INITIALIZE = 'INITIALIZE';

const initialState = {
    isInitialized: false
}


const appReducer = (state = initialState, action) => {
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


export const setInitialized = () => ({type: INITIALIZE})


export const initialize =  () => async dispatch => {
    let promises = [
        dispatch(isLogged()),
        dispatch(loadLanguages()),
    ]
    await Promise.all(promises);
    dispatch(setInitialized());

}


export default appReducer;
