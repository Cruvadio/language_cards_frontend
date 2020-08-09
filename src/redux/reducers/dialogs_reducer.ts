import {ActionType, RootState} from '../store'
import {CreateDialog, DialogType, MessageType, SendMessageType} from '../../types/global'
import {ThunkAction} from 'redux-thunk'
import {dialogsAPI} from '../../api/dialogs_api'
import {FormikHelpers} from 'formik'
import WebSocketInstance from '../../api/websocket'


let initialState = {
    dialogs: [] as Array<DialogType>,
    currentDialog: null as number | null,

    messages: [] as Array<MessageType>,
    pageSize: 15,
    isFetching: false,
    isEndOfMessages: false,
    formikHelpers: null as null | FormikHelpers<SendMessageType>
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
            return {
                ...state,
                messages: [action.message, ...state.messages]
            }
        case 'lc/dialogs_reducer/TOGGLE_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'lc/dialogs_reducer/SET_DIALOGS':
            return {
                ...state,
                dialogs: action.dialogs
            }
        case 'lc/dialogs_reducer/SET_MESSAGES':

            if (action.messages.length === 0) return state
            return {
                ...state,
                messages: [...state.messages, ...action.messages]
            }
        case 'lc/dialogs_reducer/SET_FORMIK_HELPERS':
            return {
                ...state,
                formikHelpers: action.formikHelpers
            }
        case 'lc/dialogs_reducer/CLEAR_MESSAGES':
            return {
                ...state,
                messages: []
            }
        case 'lc/dialogs_reducer/SET_END':
            return {
                ...state,
                isEndOfMessages: action.isEnd
            }
        default:
            return state

    }
}

export const actions = {
    setDialogs: (dialogs: Array<DialogType>) => ({type: 'lc/dialogs_reducer/SET_DIALOGS', dialogs} as const),
    setMessages: (messages: Array<MessageType>) => ({type: 'lc/dialogs_reducer/SET_MESSAGES', messages} as const),
    clearMessages: () => ({type: 'lc/dialogs_reducer/CLEAR_MESSAGES'} as const),
    changeDialog: (dialog: number) => ({type: 'lc/dialogs_reducer/CHANGE_DIALOG', dialog} as const),
    addMessage: (message: MessageType) => ({type: 'lc/dialogs_reducer/ADD_MESSAGE', message} as const),
    toggleFetching: (isFetching: boolean) => ({type: 'lc/dialogs_reducer/TOGGLE_FETCHING', isFetching} as const),
    setEnd: (isEnd: boolean) => ({type: 'lc/dialogs_reducer/SET_END', isEnd} as const),
    setFormikHelpers: (formikHelpers: FormikHelpers<SendMessageType>) =>
        ({type: 'lc/dialogs_reducer/SET_FORMIK_HELPERS', formikHelpers} as const),

}


type ThunkActionType = ThunkAction<Promise<any>, RootState, any, Actions>


export const getDialogs = (page: number): ThunkActionType => {
    return async (dispatch) => {

        try {
            dispatch(actions.toggleFetching(true))
            const data = await dialogsAPI.getDialogs(page)
            dispatch(actions.toggleFetching(false))
            dispatch(actions.setDialogs(data.results))
        } catch (error) {
            console.log(error.response)
        }

    }
}

export const getMessages = (page: number, dialogID: number): ThunkActionType => {
    return async (dispatch, getState) => {
        try {
            const pageSize = getState().dialogs.pageSize
            dispatch(actions.toggleFetching(true))
            await WebSocketInstance.reconnect(dialogID, pageSize)
            WebSocketInstance.loadMessages(page, pageSize, dialogID)
        } catch (error) {
            console.log(error.response)
        }

    }
}


export const sendMessage = (message : SendMessageType, dialogID: number, formikHelpers : FormikHelpers<SendMessageType>): ThunkActionType => {
    return async (dispatch, getState) => {
        try {
            dispatch(actions.setFormikHelpers(formikHelpers))
            await WebSocketInstance.reconnect(dialogID, getState().dialogs.pageSize)
            WebSocketInstance.addMessage(message)
        } catch (error) {
            console.log(error.response)
            formikHelpers.setSubmitting(false)
            formikHelpers.setErrors({text: "Failed to send message"})
        }

    }
}

export const createDialog = (userID: number, type: 'C' | 'D'): ThunkActionType => {
    return async (dispatch, getState) => {
        try {
            dispatch(actions.toggleFetching(true))
            const dialog: CreateDialog = {
                participants: [userID, getState().auth.currentUser.userID as number],
                type: type
            }
            const data = await dialogsAPI.createDialog(dialog)
            dispatch(actions.toggleFetching(false))

        } catch (error) {
            console.log(error.response)
        }

    }
}

export const addMessage = (message: MessageType): ThunkActionType => {
    return async (dispatch, getState) => {
        dispatch(actions.addMessage(message))
        const formikHelpers = getState().dialogs.formikHelpers
        dispatch(actions.toggleFetching(false))

        formikHelpers?.resetForm()
        formikHelpers?.setSubmitting(false)
    }
}
export default dialogsReducer