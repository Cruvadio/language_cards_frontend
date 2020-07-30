import dialogsReducer, {InitialStateType, actions} from './dialogs_reducer'

let state : InitialStateType;

beforeEach(() => {
    state = {
        messages: [
            {
                id: 1,
                date: "now",
                receiver: "Cruvadio",
                sender: "Someone",
                is_new: true,
                text: "Message"
            },
            {
                id: 2,
                date: "now",
                receiver: "Cruvadio",
                sender: "Someone",
                is_new: true,
                text: "Message"
            },
            {
                id: 3,
                date: "now",
                receiver: "Cruvadio",
                sender: "Someone",
                is_new: true,
                text: "Message"
            },
        ],
        isFetching: false
    }
})

test("", () => {
    const newState = dialogsReducer(state, actions.addMessage(
        {
            id: 4,
            date: "now",
            receiver: "Cruvadio",
            sender: "Someone",
            is_new: true,
            text: "Message"
        }
    ))

    expect(newState.messages.length).toBe(4)
})