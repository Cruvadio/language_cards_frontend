import {userAPI} from "../../api/api";
import {setIsNewUser} from "./auth_reducer";
import {stopSubmit} from "redux-form";

const TOGGLE_FETCHING = "profile_reducer/TOGGLE_FETCHING";
const SET_PROFILE = "profile_reducer/SET_PROFILE";
const AVATAR_CHANGE_SUCCESS = "profile_reducer/AVATAR_CHANGE_SUCCESS";
const SET_EDITING = "profile_reducer/SET_EDITING";


let initialState = {
    profile: null,
    isFetching: false,
    isEditingSuccess: true,
}


const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                profile: {
                    ...action.profile
                }
            }

        case TOGGLE_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            }

        case AVATAR_CHANGE_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    ...action.photos
                }
            }
        case SET_EDITING:
            return {
                ...state,
                isEditingSuccess: action.isEditingSuccess,
            }
        default:
            return state;

    }


}

export const toggleFetching = (isFetching) => ({type: TOGGLE_FETCHING, isFetching})
export const setProfile = (profile) => ({type: SET_PROFILE, profile})
export const avatarChangeSucces = (photos) => ({type: AVATAR_CHANGE_SUCCESS, photos})
export const setEditingSuccess = (isEditingSuccess) => ({type: SET_EDITING, isEditingSuccess})


export const getUser = (userID) =>
    async (dispatch) => {
        dispatch(toggleFetching(true));
        try {
            let data = await userAPI.getProfile(userID)
            dispatch(setProfile(data));
            dispatch(toggleFetching(false));

        } catch (error) {
            console.log(error)
        }
    }
export const changeAvatar = (image) => async dispatch =>{
    try {
        let data = await userAPI.changeAvatar(image);
        console.log(data);
        dispatch(avatarChangeSucces(data));
    }catch (e) {
        console.log(e.response);
    }
}


function _calculateAge(birthday) {
    let today = new Date();
    let birthDate = new Date(birthday)
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
        age--;
    }
    return age;

}

export const editProfile = ({
                                languages_know,
                                languages_learn,
                                birth_date,
                                hobbies,
                                about_me
                            }) => async (dispatch, getState) =>{
    try {
        const userID = getState().auth.currentUser.userID;
        let data = await userAPI.editProfile(userID, languages_know, languages_learn,birth_date, hobbies, about_me);
        console.log(data);
        const profile = {
            ...getState().profile.profile,
            languages_know,
            languages_learn,
            birth_date,
            hobbies,
            about_me,
            age: _calculateAge(birth_date)
        }
        dispatch(setProfile(profile));
        dispatch(setEditingSuccess(true));
    }catch (e) {
        console.log(e.response);
        dispatch(stopSubmit("profile-info-form", {_error: e.response.data.message}))
    }
}

export default profileReducer;