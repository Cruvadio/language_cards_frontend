import * as axios from "axios";
import {cardsAPI} from "../../api/api";

const SET_CARDSETS = "SET-CARDSETS";
const ADD_CARDSET = "ADD-CARDSET"
const API_CARDSET = "http://localhost:8000/cardsets/";
const MORE_CARDSETS = "MORE-CARDSETS";


let initialState = {
    cardsets: [],
    totalCount: 0,
    nextPage: "",

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
        case MORE_CARDSETS:
        {
            return {
                ...state,
                nextPage: action.nextPage,
                cardsets: [...state.cardsets, ...action.newCards.map(cardset => {
                    return{
                        id: cardset.id,
                        cardName: cardset.name,
                        language: cardset.to_language.name,
                        lastDate: cardset.last_revision_date
                    }
                })]
            }
        }
        default:
            return state;

    }
}


export const setCardsets = (cardsets,nextPage, totalCount) => ({type: SET_CARDSETS, cardsets, totalCount, nextPage})
export const addCardset = (cardset) => ({type: ADD_CARDSET, cardset})
export const moreCardsets = (newCards, nextPage) => ({type: MORE_CARDSETS, nextPage, newCards})

export const getCurrentUserCards = nextPage => dispatch => {
    let action = nextPage? moreCardsets : setCardsets;
    cardsAPI.getCurrentUserCards(nextPage).then (data => {
        dispatch(action(data.results, data.next, data.count))
    })
}
export default cardsReducer;