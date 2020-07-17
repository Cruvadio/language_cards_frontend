import {cardsAPI} from "../../api/api";

const SET_CARDSETS = "cards_reducer/SET-CARDSETS";
const ADD_CARDSET = "cards_reducer/ADD-CARDSET"
const MORE_CARDSETS = "cards_reducer/MORE-CARDSETS";
const NEW_TO_OLD_CARDSETS = "cards_reducer/NEW_TO_OLD_CARDSETS"
const TOGGLE_FETCHING = "cards_reducer/TOGGLE_FETCHING";


let initialState = {
    cardsets: [],
    newCardsets: [],
    pageSize: 3,
    totalCount: 0,
    nextPage: "",
    isFetching: false,
}


const cardsReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_CARDSETS:
        {
            return {
                ...state,
                cardsets: action.cardsets.map((cardset) => {
                    return {
                        id: cardset.id,
                        cardName: cardset.name,
                        language: cardset.name,
                        lastDate: cardset.last_revision_date
                    }
                }),
                totalCount: action.totalCount,
                nextPage: action.nextPage
            }
        }
        case NEW_TO_OLD_CARDSETS:
            return {
                ...state,
                cardsets: [...state.cardsets, ...state.newCardsets],
                newCardsets: []
            }
        case MORE_CARDSETS:
        {
            return {
                ...state,
                nextPage: action.nextPage,

                newCardsets: [...action.newCards.map(cardset => {
                    return{
                        id: cardset.id,
                        cardName: cardset.name,
                        language: cardset.to_language.name,
                        lastDate: cardset.last_revision_date
                    }
                })]
            }
        }

        case TOGGLE_FETCHING:
        {
            return {
                ...state,
                isFetching: action.isFetching,
            }
        }
        default:
            return state;

    }
}


export const setCardsets = (cardsets,nextPage, totalCount) => ({type: SET_CARDSETS, cardsets, totalCount, nextPage})
export const addCardset = (cardset) => ({type: ADD_CARDSET, cardset})
export const moreCardsets = (newCards, nextPage) => ({type: MORE_CARDSETS, nextPage, newCards})
export const toggleFetching = (fetch) => ({type: TOGGLE_FETCHING, isFetching: fetch})
export const newToOldCardsets = () => ({type: NEW_TO_OLD_CARDSETS})

export const getCurrentUserCards = (nextPage, pageSize) => dispatch => {
    let action = nextPage? moreCardsets : setCardsets;
    dispatch(toggleFetching(true));
    cardsAPI.getCurrentUserCards(nextPage, pageSize).then (data => {
        dispatch(action(data.results, data.next, data.count));
        dispatch(toggleFetching(false));
        dispatch(newToOldCardsets());
    })
        .catch(error => {
            console.log(error.response);
        })
}
export default cardsReducer;