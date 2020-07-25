import {isLogged} from "./auth_reducer";
import {loadLanguages} from "./common_reducer";
import {ThunkAction} from "redux-thunk";
import {ActionType, RootState} from "../store";

const INITIALIZE = 'app_reducer/INITIALIZE';


const initialState  = {
    isInitialized: false
}

type InitialStateType = typeof initialState;


type Actions = ActionType<typeof action>

const appReducer = (state = initialState, action : Actions): InitialStateType => {
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

export const action = {
    setInitialized :() => ({type: INITIALIZE} as const)
}



export const initialize =  () : ThunkAction<Promise<void>, RootState, any, Actions> =>
    async (dispatch ) => {
    let promises = [
        dispatch(isLogged()),
        dispatch(loadLanguages()),
    ]
    await Promise.all(promises);
    dispatch(action.setInitialized());

}


export default appReducer;
