import React from 'react';
import {connect} from "react-redux";
import ProfileCards from "./ProfileCards";
import {moreCardsetsAC, setCardsetsAC} from "../../../redux/reducers/cards_reducer";


let mapStateToProps = (state) => ({
    cardsets: state.cards.cardsets,
    nextPage: state.cards.nextPage,
})

let mapDispatchToProps = (dispatch) => ({
    setCardsets: (cardsets, totalCount, nextPage) => { dispatch(setCardsetsAC(cardsets, totalCount, nextPage))},
    moreCardsets: (newCards, nextPage) => {dispatch(moreCardsetsAC(newCards, nextPage))}
})


let ProfileCardsContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileCards);

export default ProfileCardsContainer;