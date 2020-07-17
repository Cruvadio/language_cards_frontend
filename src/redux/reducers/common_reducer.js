import {commonAPI} from "../../api/api";

const initialState = {
    languages: []
}

const SET_LANGUAGES = "common_reducer/SET_LANGUAGES";


export const commonReducer = (state = initialState, action) => {
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


export const setLanguages = (languages) => ({type: SET_LANGUAGES, languages})


export const loadLanguages = () =>async dispatch => {
    try {
        let data = await commonAPI.loadLanguages();
        console.log(data)
        dispatch(setLanguages(data.results.map(l => l.name)))
    }catch (e) {
        console.log(e.response)
    }
}