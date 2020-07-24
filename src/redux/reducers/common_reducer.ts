import {commonAPI} from "../../api/api";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../store";

const initialState = {
    languages: [] as Array<string>
}

type InitialStateType = typeof initialState;

const SET_LANGUAGES = "common_reducer/SET_LANGUAGES";


export const commonReducer = (state = initialState, action : SetLanguagesActionType)
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


export type SetLanguagesActionType = {
    type: typeof SET_LANGUAGES,
    languages: Array<string>
}

export const setLanguages = (languages : Array<string>) : SetLanguagesActionType=> ({type: SET_LANGUAGES, languages})


export const loadLanguages = (): ThunkAction<Promise<void>, RootState, any, SetLanguagesActionType> =>
    async (dispatch : any) => {
    try {
        let data = await commonAPI.loadLanguages();
        console.log(data)
        type LanguageType = {
            name: string,
        }
        dispatch(setLanguages(data.results.map((l : LanguageType) : string => l.name)))
    }catch (e) {
        console.log(e.response)
    }
}