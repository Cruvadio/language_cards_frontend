import {ActionType} from '../store'
import {MessageType} from '../../types/global'


let initialState = {
    messages: [] as Array<MessageType>,

    isFetching: false
}

export type InitialStateType = typeof initialState

type Actions = ActionType<typeof actions>

const dialogsReducer = (state = initialState, action : Actions) : InitialStateType => {
    switch (action.type) {
        case 'lc/dialogs_reducer/SET_MESSAGES':
            return {
                ...state,
                messages: action.messages
            }
        case 'lc/dialogs_reducer/ADD_MESSAGE': {

            return {
                ...state,
                messages: [...state.messages, action.message]
            };
        }
        case 'lc/dialogs_reducer/TOGGLE_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;

    }
}

export const actions = {
    addMessage: (message: MessageType) => ({type: 'lc/dialogs_reducer/ADD_MESSAGE', message} as const),
    setMessages: (messages: Array<MessageType>) => ({type: 'lc/dialogs_reducer/SET_MESSAGES', messages} as const),
    toggleFetching: (isFetching: boolean) => ({type: 'lc/dialogs_reducer/TOGGLE_FETCHING' , isFetching} as const)
}


export default dialogsReducer;