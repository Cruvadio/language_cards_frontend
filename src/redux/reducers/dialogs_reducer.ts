import {ActionType} from '../store'
import {CurrentDialogType, DialogType, MessageType} from '../../types/global'


let initialState = {
    dialogs: [] as Array<DialogType>,
    currentDialog: null as CurrentDialogType | null,

    isFetching: false
}

export type InitialStateType = typeof initialState

type Actions = ActionType<typeof actions>

const dialogsReducer = (state = initialState, action: Actions): InitialStateType => {
    switch (action.type) {
        case 'lc/dialogs_reducer/CHANGE_DIALOG':
            return {
                ...state,
                currentDialog: action.dialog
            }
        case 'lc/dialogs_reducer/ADD_MESSAGE':
            if (!state.currentDialog)
                return state
            return {
                ...state,
                currentDialog: {
                    ...state.currentDialog,
                    messages: [...state.currentDialog.messages, action.message]
                }
            }
        case 'lc/dialogs_reducer/TOGGLE_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state

    }
}

export const actions = {
    changeDialog: (dialog: CurrentDialogType) => ({type: 'lc/dialogs_reducer/CHANGE_DIALOG', dialog} as const),
    addMessage: (message: MessageType) => ({type: 'lc/dialogs_reducer/ADD_MESSAGE', message} as const),
    toggleFetching: (isFetching: boolean) => ({type: 'lc/dialogs_reducer/TOGGLE_FETCHING', isFetching} as const)
}


export default dialogsReducer