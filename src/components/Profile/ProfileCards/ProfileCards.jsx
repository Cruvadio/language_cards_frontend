import React from 'react';
import s from './ProfileCards.module.scss'
import Button from "../../common/Button/Button";
import ProfileCard from "./ProfileCard/ProfileCard";

let ProfileCards = (props) => {

    let cardsElements = props.cardsets.map((card) => {
        return <ProfileCard key={card.id} cardName={card.cardName}
                            language={card.language}
                            lastDate={card.lastDate}/>
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

                {props.nextPage ?
                    <div><Button name="More" onClick={props.onMoreClick}/></div> : <div></div>}
            </div>
        </div>
    )
}

export default ProfileCards;
