import {cardsAPI} from "../../api/api";
import {CardsetType} from "../../types/global";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../store";

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


const cardsReducer = (state = initialState, action: ActionType): InitialStateType => {
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

type ActionType = SetCardsetsActionType | AddCardsetActionType | MoreCardsetsActionType | ToggleFetchingActionType

export type SetCardsetsActionType = {
    type: typeof SET_CARDSETS,
    cardsets: Array<CardsetType>
    totalCount: number,
    nextPage: string
}
export const setCardsets = (cardsets: Array<CardsetType>, nextPage: string, totalCount: number): SetCardsetsActionType => ({
    type: SET_CARDSETS,
    cardsets,
    totalCount,
    nextPage
})
export type AddCardsetActionType = {
    type: typeof ADD_CARDSET,
    cardset: CardsetType
}
export const addCardset = (cardset: CardsetType): AddCardsetActionType => ({type: ADD_CARDSET, cardset})

type MoreCardsetsActionType = {
    type: typeof MORE_CARDSETS,
    newCards: Array<CardsetType>,
    nextPage: string
}
export const moreCardsets = (newCards: Array<CardsetType>, nextPage: string): MoreCardsetsActionType => ({
    type: MORE_CARDSETS,
    nextPage,
    newCards
})

type ToggleFetchingActionType = {
    type: typeof TOGGLE_FETCHING,
    isFetching: boolean
}
export const toggleFetching = (fetch: boolean): ToggleFetchingActionType => ({type: TOGGLE_FETCHING, isFetching: fetch})


export const getCurrentUserCards =
    (nextPage: string | null, pageSize: number):ThunkAction<any, RootState, any, ActionType> =>
    (dispatch) => {
    let action = nextPage ? moreCardsets : setCardsets;
    dispatch(toggleFetching(true));
    cardsAPI.getCurrentUserCards(nextPage, pageSize).then(data => {
        dispatch(action(data.results, data.next, data.count));
        dispatch(toggleFetching(false));
    })
        .catch(error => {
            console.log(error.response);
        })
}

export default cardsReducer;
