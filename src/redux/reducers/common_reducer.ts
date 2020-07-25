import {commonAPI} from "../../api/api";
import {ThunkAction} from "redux-thunk";
import {ActionType, RootState} from "../store";

const initialState = {
    languages: [] as Array<string>
}

type InitialStateType = typeof initialState;

const SET_LANGUAGES = "common_reducer/SET_LANGUAGES";


type Actions = ActionType<typeof actions>

export const commonReducer = (state = initialState, action : Actions)
    : InitialStateType => {
    switch (action.type) {
        case SET_LANGUAGES:
            return {
                ...state,
                languages: [...action.languages]
            }
        default:
            return state;

    }
}

export const actions = {
    setLanguages: (languages : Array<string>) => ({type: SET_LANGUAGES, languages} as const)
}

export const loadLanguages = (): ThunkAction<Promise<void>, RootState, any, Actions> =>
    async (dispatch : any) => {
    try {
        let data = await commonAPI.loadLanguages();
        console.log(data)
        type LanguageType = {
            name: string,
        }
        dispatch(actions.setLanguages(data.results.map((l : LanguageType) : string => l.name)))
    }catch (e) {
        console.log(e.response)
    }
}