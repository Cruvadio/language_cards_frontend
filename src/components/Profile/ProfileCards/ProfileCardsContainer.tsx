import React, {Component} from 'react';
import {connect} from "react-redux";
import ProfileCards from "./ProfileCards";
import {getCurrentUserCards} from "../../../redux/reducers/cards_reducer";
import {CardsetType} from "../../../types/global";
import {RootState} from "../../../redux/store";


type MapStatePropsType = {
    cardsets: Array<CardsetType>,
    totalCount: number,
    nextPage: string,
    isFetching: boolean,
    pageSize: number,
}

type MapDispatchPropsType = {
    getCurrentUserCards: (nextPage: string | null, pageSize: number) => void
}

class ProfileCardsContainer extends Component<MapStatePropsType & MapDispatchPropsType> {

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


let mapStateToProps = (state : RootState) => ({
    cardsets: state.cards.cardsets,
    totalCount: state.cards.totalCount,
    nextPage: state.cards.nextPage,
    isFetching: state.cards.isFetching,
    pageSize: state.cards.pageSize,
})


export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootState>(mapStateToProps, {getCurrentUserCards})(ProfileCardsContainer);