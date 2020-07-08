import React, {Component} from 'react';
import {connect} from "react-redux";
import ProfileCards from "./ProfileCards";
import {getCurrentUserCards, moreCardsets, setCardsets} from "../../../redux/reducers/cards_reducer";
import * as axios from "axios";


class ProfileCardsContainer extends Component {

    componentDidMount() {
        this.props.getCurrentUserCards();
    }

    onMoreClick = () => {

        this.props.getCurrentUserCards(this.props.nextPage)
    }

    render() {
        return <ProfileCards {...this.props} onMoreClick={this.onMoreClick}/>
    }
}


let mapStateToProps = (state) => ({
    cardsets: state.cards.cardsets,
    totalCount: state.cards.totalCount,
    nextPage: state.cards.nextPage,
})

export default connect(mapStateToProps, {getCurrentUserCards})(ProfileCardsContainer);