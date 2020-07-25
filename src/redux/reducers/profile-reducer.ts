import {userAPI} from "../../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, ProfileType} from "../../types/global";
import {ThunkAction} from "redux-thunk";
import {ActionType, RootState} from "../store";
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

const profileReducer = (state: InitialStateType = initialState, action : Actions): InitialStateType => {
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

type Actions = ActionType<typeof actions>


export const actions = {
    toggleFetching: (isFetching: boolean) => ({type: TOGGLE_FETCHING, isFetching}as const),



    setProfile: (profile: ProfileType) => ({type: SET_PROFILE, profile}as const),




    avatarChangeSuccess: (photos : PhotosType) => ({type: AVATAR_CHANGE_SUCCESS, photos}as const),



    setEditingSuccess: (isEditingSuccess : boolean) => ({type: SET_EDITING, isEditingSuccess}as const),

}



type ThunkActionType = ThunkAction<Promise<void>, RootState, void, AnyAction>

export const getUser = (userID : number) : ThunkActionType =>
    async (dispatch ) => {
        dispatch(actions.toggleFetching(true));
        try {
            let data = await userAPI.getProfile(userID)
            dispatch(actions.setProfile(data));
            dispatch(actions.toggleFetching(false));

        } catch (error) {
            console.log(error)
        }
    }
export const changeAvatar = (image : File) : ThunkActionType=>
    async (dispatch) => {
    try {
        let data = await userAPI.changeAvatar(image);
        console.log(data);
        dispatch(actions.avatarChangeSuccess(data));
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
        dispatch(actions.setProfile(profile));
        dispatch(actions.setEditingSuccess(true));
    } catch (e) {
        console.log(e.response);
        dispatch(stopSubmit("profile-info-form", {_error: e.response.data.message}))
    }
}

export default profileReducer;