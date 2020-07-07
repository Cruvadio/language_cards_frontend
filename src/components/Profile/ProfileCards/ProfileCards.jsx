import React, {Component} from 'react';
import s from './ProfileCards.module.scss'
import Button from "../../Button/Button";
import ProfileCard from "./ProfileCard/ProfileCard";
import * as axios from 'axios';

class ProfileCards extends Component{

    componentDidMount()
    {

        axios.get('http://localhost:8000/cardsets/?limit=3&user_id=1')
            .then(response => {

                this.props.setCardsets(response.data.results, response.data.count, response.data.next);
            })
    }

    onMoreClick = () => {
        debugger;
        axios.get(this.props.nextPage)
            .then(response => {
                this.props.moreCardsets(response.data.results, response.data.next);
            })
    }

    render()
    {
        let cardsElements = this.props.cardsets.map((card) => {
            return <ProfileCard key={card.id} cardName={card.cardName}
                                language={card.language}
                                lastDate={card.lastDate} />
        })
        return (
            <div className={s.cards}>
                <div className={s.header}>
                    <div>My Cards</div>
                    <button className={s.button}/>
                </div>
                <div className={s.inner}>
                    <div className={s.elements}>
                        {cardsElements}
                    </div>


                    <div ><Button name="More" onClick={this.onMoreClick}/></div>
                </div>
            </div>
        )
    }
}

export default ProfileCards;
