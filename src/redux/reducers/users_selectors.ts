import {RootState} from "../store";

export const FetchingSelector = (state: RootState) => {
    return state.users.isFetching
}

export const PagesCountSelector = (state: RootState) => {
    return Math.ceil(state.users.count / state.users.pageSize)
}

export const PortionSizeSelector = (state: RootState) => {
    return state.users.portionSize
}

export const UsersListSelector = (state: RootState) => {
    return state.users.users
}

export const CurrentUserSelector = (state: RootState) => {
    return state.auth.currentUser
}
