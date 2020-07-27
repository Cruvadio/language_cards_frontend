import {CardsetType} from "../../types/global";
import {ThunkAction} from "redux-thunk";
import {ActionType, RootState} from "../store";
import {cardsAPI} from "../../api/cards_api";

const SET_CARDSETS = "cards_reducer/SET-CARDSETS";
const ADD_CARDSET = "cards_reducer/ADD-CARDSET"
const MORE_CARDSETS = "cards_reducer/MORE-CARDSETS";
const TOGGLE_FETCHING = "cards_reducer/TOGGLE_FETCHING";


let initialState = {
    cardsets: [] as Array<CardsetType>,
    pageSize: 3,
    totalCount: 0,
    nextPage: "",
    isFetching: false,
};

type InitialStateType = typeof initialState;


const cardsReducer = (state = initialState, action: Actions): InitialStateType => {
    switch (action.type) {

        case SET_CARDSETS: {
            return {
                ...state,
                cardsets: [...action.cardsets],
                totalCount: action.totalCount,
                nextPage: action.nextPage
            }
        }
        case MORE_CARDSETS: {
            return {
                ...state,
                nextPage: action.nextPage,

                cardsets: [...state.cardsets, ...action.newCards]
            }
        }

        case TOGGLE_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching,
            }
        }
        default:
            return state;

    }
}

type Actions = ActionType<typeof actions>


export const actions = {
    setCardsets: (cardsets: Array<CardsetType>, nextPage: string, totalCount: number) => ({
        type: SET_CARDSETS,
        cardsets,
        totalCount,
        nextPage
    } as const),
    addCardset: (cardset: CardsetType) => ({type: ADD_CARDSET, cardset} as const),

    moreCardsets: (newCards: Array<CardsetType>, nextPage: string)  => ({
        type: MORE_CARDSETS,
        nextPage,
        newCards
    } as const),

    toggleFetching: (fetch: boolean)  => ({type: TOGGLE_FETCHING, isFetching: fetch} as const),

}


export const getCurrentUserCards =
    (nextPage: string | null, pageSize: number):ThunkAction<any, RootState, any, Actions> =>
    (dispatch) => {
    let action = nextPage ? actions.moreCardsets : actions.setCardsets;
    dispatch(actions.toggleFetching(true));
    cardsAPI.getCurrentUserCards(nextPage, pageSize).then(data => {
        dispatch(action(data.results, data.next, data.count));
        dispatch(actions.toggleFetching(false));
    })
        .catch(error => {
            console.log(error.response);
        })
}

export default cardsReducer;
