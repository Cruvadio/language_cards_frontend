import {RootState} from '../store'

export const DialogsSelector = (state : RootState) => {
    return state.dialogs.dialogs
}

export const CurrentDialogSelector = (state: RootState) => {
    const dialogID = state.dialogs.currentDialog
    return dialogID || 0
}

export const MessagesSelector = (state: RootState) => {
    return state.dialogs.messages
}

export const FetchingSelector = (state: RootState) => {
    return state.dialogs.isFetching
}

export const PageSizeSelector = (state: RootState) => {
    return state.dialogs.pageSize
}


export const IsEndSelector = (state: RootState) => {
    return state.dialogs.isEndOfMessages
}


