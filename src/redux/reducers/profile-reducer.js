import {userAPI} from "../../api/api";

const TOGGLE_FETCHING = "TOGGLE_FETCHING";
const SET_PROFILE = "SET_PROFILE";

let initialState = {
    profile: null,
    isFetching: false
}


const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        case TOGGLE_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            }
        default:
            return state;

    }
}

export const toggleFetching = (isFetching) => ({type: TOGGLE_FETCHING, isFetching})
export const setProfile = (profile) => ({type: SET_PROFILE, profile})

export const getUser = (userID) =>
    (dispatch) => {
        dispatch(toggleFetching(true));
        userAPI.getProfile(userID)
            .then(
                data => {
                    dispatch(toggleFetching(false))
                    dispatch(setProfile(data))
                }
            )
            .catch(
                error => console.log(error)
            )
}
export default profileReducer;