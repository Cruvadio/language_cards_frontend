import {RootState} from "../store";

export const getFetching = (state: RootState) => {
    return state.users.isFetching
}

export const getPagesCount = (state: RootState) => {
    return Math.ceil(state.users.count / state.users.pageSize)
}

export const getPortionSize = (state: RootState) => {
    return state.users.portionSize
}

export const getUsersList = (state: RootState) => {
    return state.users.users
}