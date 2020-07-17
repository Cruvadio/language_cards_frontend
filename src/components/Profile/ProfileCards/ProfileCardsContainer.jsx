import React, {Component} from 'react';
import {connect} from "react-redux";
import ProfileCards from "./ProfileCards";
import {getCurrentUserCards} from "../../../redux/reducers/cards_reducer";


class ProfileCardsContainer extends Component {

    componentDidMount() {
        this.props.getCurrentUserCards(null, this.props.pageSize);
    }

    onMoreClick = () => {

        this.props.getCurrentUserCards(this.props.nextPage, this.props.pageSize)
    }

    render() {
        return <ProfileCards {...this.props} onMoreClick={this.onMoreClick}/>
    }
}


let mapStateToProps = (state) => ({
    newCardsets: state.cards.newCardsets,
    cardsets: state.cards.cardsets,
    totalCount: state.cards.totalCount,
    nextPage: state.cards.nextPage,
    isFetching: state.cards.isFetching,
    pageSize: state.cards.pageSize,
})


export default connect(mapStateToProps, {getCurrentUserCards})(ProfileCardsContainer);