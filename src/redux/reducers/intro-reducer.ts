let initialState = {
    introTitle: "Which worlds would you like to learn?",
    buttonName: "Join",
}

type InitialStateType = typeof initialState

const introReducer = (state = initialState, action : any) : InitialStateType => {
    return state;
}

export default introReducer;