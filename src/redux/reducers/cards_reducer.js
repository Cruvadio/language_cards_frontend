import * as axios from "axios";

const SET_CARDSETS = "SET-CARDSETS";
const ADD_CARDSET = "ADD-CARDSET"
const API_CARDSET = "http://localhost:8000/cardsets/";
const MORE_CARDSETS = "MORE-CARDSETS";


let initialState = {
    cardsets: [
            /*{
                id: 1,
                cardName: "Grundlegende Wörter",
                language: "German",
                lastDate: "2 days ago",
            },
            {
                id: 2,
                cardName: "Grundlegende Wörter",
                language: "German",
                lastDate: "2 days ago",
            },
            {
                id: 3,
                cardName: "Grundlegende Wörter",
                language: "German",
                lastDate: "2 days ago",
            },*/
        ],
    totalCount: 0,
    nextPage: "",

}


const cardsReducer = (state = initialState, action) => {
    debugger;
    switch (action.type) {

        case SET_CARDSETS:
        {
            return {
                ...state,
                cardsets: action.cardsets.map((cardset) => {
                    return {
                        id: cardset.id,
                        cardName: cardset.name,
                        language: cardset.to_language,
                        lastDate: cardset.last_revision_date
                    }
                }),
                totalCount: action.totalCount,
                nextPage: action.nextPage
            }
        }
        case MORE_CARDSETS:
        {
            debugger;
            return {
                ...state,
                nextPage: action.nextPage,
                cardsets: [...state.cardsets, ...action.newCards.map(cardset => {
                    return{
                        id: cardset.id,
                        cardName: cardset.name,
                        language: cardset.to_language,
                        lastDate: cardset.last_revision_date
                    }
                })]
            }
        }
        default:
            return state;

    }
}


export const setCardsetsAC = (cardsets, totalCount, nextPage) => ({type: SET_CARDSETS, cardsets, totalCount, nextPage})
export const addCardsetAC = (cardset) => ({type: ADD_CARDSET, cardset})
export const moreCardsetsAC = (newCards, nextPage) => ({type: MORE_CARDSETS, nextPage, newCards})
export default cardsReducer;