import {UserListType} from "../../types/global";
import {ActionType, RootState} from "../store";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {usersAPI} from "../../api/users_api";

let initialState = {
    count: 0,
    nextPage: null as string | null,
    pageSize: 5,
    portionSize: 10,
    users: [] as Array<UserListType>,
    isFetching: false,
    fetching_followings: [] as Array<number>
}

type InitialStateType = typeof initialState

type Actions = ActionType<typeof actions>

const usersReducer = (state: InitialStateType = initialState, action: Actions): InitialStateType => {
    switch (action.type) {
        case "lc/user-reducer/SET_USERS":
            return {
                ...state,
                users: action.users,
                nextPage: action.next,
                count: action.count,
            }
        case "lc/user-reducer/TOGGLE_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "lc/user-reducer/ADD_FOLLOWER_FETCHING":
            return {
                ...state,
                fetching_followings: [...state.fetching_followings, action.userID]
            }
        case "lc/user-reducer/DELETE_FOLLOWER_FETCHING":
            return {
                ...state,
                fetching_followings: state.fetching_followings.filter(id => id !== action.userID)
            }
        case "lc/user-reducer/UPDATE_USER":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.user.id === action.user.user.id) {
                        return action.user
                    }
                    return u;
                })
            }
        default:
            return state;

    }
}


export const actions = {
    setUsers: (users: Array<UserListType>, count: number, next: string) => (
        {type: "lc/user-reducer/SET_USERS", users, count, next} as const
    ),
    toggleFetching: (isFetching: boolean) =>
        ({type: 'lc/user-reducer/TOGGLE_FETCHING', isFetching} as const),
    addFollowerFetching: (userID: number) =>
        ({type: 'lc/user-reducer/ADD_FOLLOWER_FETCHING', userID} as const),
    deleteFollowerFetching: (userID: number) =>
        ({type: 'lc/user-reducer/DELETE_FOLLOWER_FETCHING', userID} as const),
    updateUser: (user: UserListType) =>
        ({type: 'lc/user-reducer/UPDATE_USER', user} as const)
}


type ThunkActionType = ThunkAction<Promise<void>, RootState, void, AnyAction>

export const getUsers = (page: number): ThunkActionType =>
    async (dispatch, getState) => {
        dispatch(actions.toggleFetching(true));
        let data = await usersAPI.getUsers(page, getState().users.pageSize)
        dispatch(actions.toggleFetching(false));
        dispatch(actions.setUsers(data.results, data.count, data.next))

    }

export const follow = (userID: number): ThunkActionType =>
    async (dispatch, getState) => {
        dispatch(actions.addFollowerFetching(userID))
        const data = await usersAPI.follow(userID)
        dispatch(actions.deleteFollowerFetching(userID))
        dispatch(actions.updateUser(data))
    }

export const unfollow = (userID: number): ThunkActionType =>
    async (dispatch, getState) => {
        dispatch(actions.addFollowerFetching(userID))
        const data = await usersAPI.unfollow(userID)
        dispatch(actions.deleteFollowerFetching(userID))
        dispatch(actions.updateUser(data))
    }

export default usersReducer