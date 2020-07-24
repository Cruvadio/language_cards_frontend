import {userAPI} from "../../api/api";
import {stopSubmit} from "redux-form";
import {ProfileType, PhotosType} from "../../types/global";
import { ThunkAction } from "redux-thunk";
import {RootState} from "../store";
import {AnyAction} from "redux";

const TOGGLE_FETCHING = "profile_reducer/TOGGLE_FETCHING";
const SET_PROFILE = "profile_reducer/SET_PROFILE";
const AVATAR_CHANGE_SUCCESS = "profile_reducer/AVATAR_CHANGE_SUCCESS";
const SET_EDITING = "profile_reducer/SET_EDITING";



let initialState = {
    profile: null as ProfileType | null,
    isFetching: false,
    isEditingSuccess: true,
}

type InitialStateType = typeof initialState

const profileReducer = (state: InitialStateType = initialState, action : ActionType): InitialStateType => {
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
                    ...state.profile as ProfileType,
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

type ActionType = ToggleFetchingActionType | SetProfileActionType
    | AvatarChangeSuccessActionType | SetEditingSuccessActionType

export type ToggleFetchingActionType = {
    type: typeof TOGGLE_FETCHING
    isFetching: boolean
}

export const toggleFetching = (isFetching: boolean): ToggleFetchingActionType => ({type: TOGGLE_FETCHING, isFetching})

export type SetProfileActionType = {
    type: typeof SET_PROFILE
    profile: ProfileType
}

export const setProfile = (profile: ProfileType): SetProfileActionType => ({type: SET_PROFILE, profile})



export type AvatarChangeSuccessActionType = {
    type: typeof AVATAR_CHANGE_SUCCESS
    photos: PhotosType
}

export const avatarChangeSuccess = (photos : PhotosType) : AvatarChangeSuccessActionType => ({type: AVATAR_CHANGE_SUCCESS, photos})

export type SetEditingSuccessActionType = {
    type: typeof SET_EDITING
    isEditingSuccess: boolean
}


export const setEditingSuccess = (isEditingSuccess : boolean) : SetEditingSuccessActionType => ({type: SET_EDITING, isEditingSuccess})


type ThunkActionType = ThunkAction<Promise<void>, RootState, void, AnyAction>

export const getUser = (userID : number) : ThunkActionType =>
    async (dispatch ) => {
        dispatch(toggleFetching(true));
        try {
            let data = await userAPI.getProfile(userID)
            dispatch(setProfile(data));
            dispatch(toggleFetching(false));

        } catch (error) {
            console.log(error)
        }
    }
export const changeAvatar = (image : File) : ThunkActionType=>
    async (dispatch) => {
    try {
        let data = await userAPI.changeAvatar(image);
        console.log(data);
        dispatch(avatarChangeSuccess(data));
    } catch (e) {
        console.log(e.response);
    }
}


function _calculateAge(birthday : string) : number {
    let today = new Date();
    let birthDate = new Date(birthday)
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
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
                            } : ProfileType) : ThunkActionType =>
    async (dispatch , getState) => {
    try {
        const userID = getState().auth.currentUser.userID;
        if (!userID) throw Error("something is wrong");
        let data = await userAPI.editProfile(userID, languages_know, languages_learn, birth_date, hobbies, about_me as string);
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
    } catch (e) {
        console.log(e.response);
        dispatch(stopSubmit("profile-info-form", {_error: e.response.data.message}))
    }
}

export default profileReducer;